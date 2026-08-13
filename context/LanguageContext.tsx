"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useSyncExternalStore,
} from "react";
import { useTranslation } from "react-i18next";
import { getInitialLanguage } from "@/lib/language-detection";
import { getClientPreferredLanguage } from "@/lib/language-cookie";
import { useIsClient } from "@/hooks/use-is-client";

export type Language = "en" | "de";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: string;
}) {
  const { i18n: i18nInstance } = useTranslation();
  const isHydrated = useIsClient();
  const serverInitialLanguage =
    initialLanguage && (initialLanguage === "en" || initialLanguage === "de")
      ? initialLanguage
      : getInitialLanguage();

  const storedLanguage = useSyncExternalStore(
    () => () => {},
    () => getClientPreferredLanguage(serverInitialLanguage) as Language,
    () => serverInitialLanguage as Language,
  );
  const [languageOverride, setLanguageOverride] = useState<Language | null>(
    null,
  );
  const language = languageOverride ?? storedLanguage;

  const currentLanguage = useMemo(() => language, [language]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("selectedLanguage", language);
    i18nInstance.changeLanguage(language);
  }, [language, isHydrated, i18nInstance]);

  const setLanguage = (lang: Language) => {
    setLanguageOverride(lang);
    i18nInstance.changeLanguage(lang);
    if (typeof document !== "undefined") {
      try {
        document.cookie = `selectedLanguage=${lang}; path=/; max-age=31536000`;
      } catch {}
    }
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const currentLang = language || i18nInstance.language;
    const bundle = i18nInstance.getResourceBundle(currentLang, "translation");
    const out = bundle?.[key] ?? key;
    if (params && typeof out === "string") {
      return Object.keys(params).reduce(
        (acc, k) => acc.replace(new RegExp(`{{${k}}}`, "g"), String(params[k])),
        out,
      );
    }
    return typeof out === "string" ? out : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: currentLanguage,
        setLanguage,
        t,
        isHydrated,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
