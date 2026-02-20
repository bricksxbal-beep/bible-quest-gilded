import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, type Language } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)["pt"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectLanguage(): Language {
  const saved = localStorage.getItem("bqp-language");
  if (saved && (saved === "pt" || saved === "en" || saved === "es")) return saved;

  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  if (browserLang === "pt") return "pt";
  if (browserLang === "es") return "es";
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLang] = useState<Language>(detectLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
    localStorage.setItem("bqp-language", lang);
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
