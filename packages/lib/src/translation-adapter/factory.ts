import React, { createContext, useCallback, useEffect, useRef } from "react";

import { zustandDevtools } from "@muatmuat/lib/utils";
import { create, useStore } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import { createTranslationStore } from "./translation.store";
import {
  ITranslationAdapter,
  Language,
  SelectedLanguageState,
  TranslationContextValue,
  TranslationParams,
} from "./types";

export type {
  ITranslationAdapter,
  Language,
  SelectedLanguageState,
  TranslationContextValue,
  TranslationParams,
} from "./types";

export const translationCacheConfig = {
  headers: {
    "Content-Type": "application/json",
    // Cache for 1 week, but allow revalidation for every 1 hour
    "Cache-Control": "public, max-age=604800, stale-while-revalidate=3600",
  },
};
export type TranslationCacheConfig = typeof translationCacheConfig;

// Define individual hook types for better type inference
export type UseTranslationHook = () => {
  t: (label: string, params?: TranslationParams, fallback?: string) => string;
  isTranslationsReady: boolean;
};

export type UseListLanguagesHook = () => { listLanguages: Language[] };

export type UseSelectedLanguageActionsHook = () => {
  setSelectedLanguage: (language: Language) => void;
};

export type UseSelectedLanguageStoreHook = <T>(
  selector: (state: SelectedLanguageState) => T
) => T;

export type TranslationProviderComponent = React.ComponentType<{
  children: React.ReactNode;
}>;

// Combine all types into the factory interface
export interface TranslationFactory {
  Provider: TranslationProviderComponent;
  useTranslation: UseTranslationHook;
  useListLanguages: UseListLanguagesHook;
  useSelectedLanguageActions: UseSelectedLanguageActionsHook;
  useSelectedLanguageStore: UseSelectedLanguageStoreHook;
}

/**
 * Factory function to create a complete translation adapter
 */
export function createTranslationAdapter(
  adapter: ITranslationAdapter
): TranslationFactory {
  // Create context
  const Context = createContext<TranslationContextValue | null>(null);

  // Create selected language store
  const useSelectedLanguageStore = create<SelectedLanguageState>()(
    zustandDevtools(
      persist(
        (set) => ({
          selectedLanguage: null,
          actions: {
            setSelectedLanguage: (language) =>
              set({
                selectedLanguage: language,
              }),
          },
        }),
        {
          name: "locale-selection",
          // Only persist selectedLanguage, not actions
          partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
        }
      ),
      {
        name: "locale-selection",
      }
    )
  );

  // Hook to access selected language actions with explicit type annotation
  const useSelectedLanguageActions: UseSelectedLanguageActionsHook = () =>
    useSelectedLanguageStore((s) => s.actions);

  // Provider component with explicit type annotation
  const Provider: TranslationProviderComponent = ({ children }) => {
    const store = useRef(createTranslationStore(adapter)).current;

    // Select state from store
    const { translation, isTranslationsReady, listLanguages } = useStore(
      store,
      useShallow((s) => ({
        translation: s.translation,
        isTranslationsReady: s.isTranslationsReady,
        listLanguages: s.listLanguages,
      }))
    );

    // The 't' function
    const t = useCallback(
      (
        label: string,
        params?: TranslationParams,
        fallback?: string
      ): string => {
        const template = translation[label];
        if (!template) return fallback || label;
        if (!params) return template;
        return template.replace(/{(\w+)}/g, (_, key) => String(params[key]));
      },
      [translation]
    );

    // ====================================================
    // Initialization logic
    // ====================================================
    const selectedLanguageUrl = useSelectedLanguageStore(
      (s: any) => s.selectedLanguage?.url
    );
    const { setSelectedLanguage } = useSelectedLanguageActions();

    // Get actions and adapter from our generic store
    const { fetchLanguages, updateTranslations } = useStore(
      store,
      (s) => s.actions
    );

    // Effect 1: Fetch language list on mount
    useEffect(() => {
      fetchLanguages();
    }, [fetchLanguages]);

    // Effect 2: Set default language once list is loaded
    useEffect(() => {
      if (listLanguages.length > 0 && !selectedLanguageUrl) {
        const setDefaultLanguage = async () => {
          const defaultLanguage =
            await adapter.getDefaultLanguage(listLanguages);
          if (defaultLanguage) {
            setSelectedLanguage(defaultLanguage);
          }
        };
        setDefaultLanguage();
      }
    }, [listLanguages, selectedLanguageUrl, setSelectedLanguage, adapter]);

    // Effect 3: Update translations when language changes
    useEffect(() => {
      if (selectedLanguageUrl) {
        updateTranslations(selectedLanguageUrl);
      }
    }, [selectedLanguageUrl, updateTranslations]);
    // ====================================================
    // End of - Initialization logic
    // ====================================================

    const contextValue: TranslationContextValue = {
      t,
      isTranslationsReady,
      listLanguages,
    };

    return React.createElement(
      Context.Provider,
      { value: contextValue },
      children
    );
  };

  // Hook for translation with explicit type annotation
  const useTranslation: UseTranslationHook = () => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(
        "useTranslation must be used within a TranslationProvider"
      );
    }
    return {
      t: context.t,
      isTranslationsReady: context.isTranslationsReady,
    };
  };

  // Hook for listing languages with explicit type annotation
  const useListLanguages: UseListLanguagesHook = () => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(
        "useListLanguages must be used within a TranslationProvider"
      );
    }
    return { listLanguages: context.listLanguages };
  };

  // Return with explicit typing to ensure proper type inference
  const result: TranslationFactory = {
    Provider,
    useTranslation,
    useListLanguages,
    useSelectedLanguageActions,
    useSelectedLanguageStore,
  };

  return result;
}
