// --- 1. Core Types & Adapter Interface ---
import xior from "xior";
import { createStore } from "zustand";

import { translationCacheConfig } from "./factory";
import { ITranslationAdapter, TranslationStore } from "./types";

export const createTranslationStore = (adapter: ITranslationAdapter) =>
  createStore<TranslationStore>((set) => ({
    // State
    translation: {},
    listLanguages: [],
    isTranslationsReady: false,
    adapter: adapter, // Store the adapter object

    // Actions
    actions: {
      fetchLanguages: async () => {
        try {
          // Use the adapter object to get languages
          const languages = await adapter.getListLanguages(
            translationCacheConfig
          );
          set({ listLanguages: languages });
        } catch (error) {
          console.error("Failed to fetch languages", error);
          set({ listLanguages: [] });
        }
      },
      updateTranslations: async (
        languageUrl: string,
        withMock: boolean = true
      ): Promise<void> => {
        if (!languageUrl) return;
        try {
          set({ isTranslationsReady: false });

          if (withMock) {
            const [commonResult, mockResult] = await Promise.allSettled([
              adapter.getTranslations(languageUrl, translationCacheConfig),
              xior.get(
                `${process.env.NEXT_PUBLIC_ASSET_REVERSE}/mock-common-${languageUrl}.json`,
                translationCacheConfig
              ),
            ]);

            // Always set translation data, even if one or both requests failed
            const mergedTranslation: Record<string, string> = {};

            // Handle adapter translations
            if (commonResult.status === "fulfilled") {
              const commonTranslations = commonResult.value;
              if (
                commonTranslations &&
                typeof commonTranslations === "object"
              ) {
                Object.assign(mergedTranslation, commonTranslations);
              }
            }

            // Handle mock translations
            if (mockResult.status === "fulfilled") {
              const mockData = mockResult.value?.data;
              if (mockData && typeof mockData === "object") {
                Object.assign(mergedTranslation, mockData);
              }
            }

            set({
              translation: mergedTranslation,
            });
          } else {
            // Use the adapter object to get translations
            const translations = await adapter.getTranslations(
              languageUrl,
              translationCacheConfig
            );
            set({ translation: translations });
          }
        } catch (error) {
          console.warn(`Error fetching ${languageUrl} translations`, error);
          set({ translation: {} });
        } finally {
          set({ isTranslationsReady: true });
        }
      },
    },
  }));
