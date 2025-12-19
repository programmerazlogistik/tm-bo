import { ReactNode } from "react";

import { TranslationCacheConfig } from "./factory";

export interface Language {
  id: string;
  image: string;
  url: string;
  name: string;
}

export interface TranslationParams {
  [key: string]: string | number;
}

/**
 * This is the "contract" for the adapter object.
 * Any object with these 3 async methods will work.
 */
export interface ITranslationAdapter {
  getListLanguages: (
    cacheConfig: TranslationCacheConfig
  ) => Promise<Language[]>;
  getTranslations: (
    languageUrl: string,
    cacheConfig: TranslationCacheConfig
  ) => Promise<Record<string, string>>;
  getDefaultLanguage: (listLanguages: Language[]) => Promise<Language>;
  withMock: boolean;
}

export interface TranslationStore {
  translation: Record<string, string>;
  listLanguages: Language[];
  isTranslationsReady: boolean;
  adapter: ITranslationAdapter; // Store holds a reference to the adapter object
  actions: {
    fetchLanguages: () => Promise<void>;
    updateTranslations: (languageUrl: string) => Promise<void>;
  };
}

export interface TranslationContextValue {
  t: (label: string, params?: TranslationParams, fallback?: string) => string;
  isTranslationsReady: boolean;
  listLanguages: Language[];
}

export interface TranslationProviderProps {
  children: ReactNode;
  /** Pass the simple adapter object here */
  adapter: ITranslationAdapter;
}

export interface SelectedLanguageState {
  selectedLanguage: Language | null;
  actions: {
    setSelectedLanguage: (language: Language) => void;
  };
}
