import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en-US" ? "pt-BR" : "en-US";
    i18n.changeLanguage(newLang);

    // Update URL with new language
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("lang", newLang);
    window.history.pushState({}, "", newUrl.toString());
  };

  const currentLang = i18n.language;

  return (
    <button
      onClick={toggleLanguage}
      className="relative bg-gray-100 rounded-lg p-1 cursor-pointer hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-gray-600" />
      <div className="relative bg-gray-200 rounded-md p-1 w-16 h-6">
        <div
          className={`absolute top-0.5 bottom-0.5 bg-white rounded-md shadow-sm transition-all duration-200 ${
            currentLang === "en-US" ? "left-0.5 w-7" : "right-0.5 w-7"
          }`}
        />
        <div className="relative flex items-center justify-center h-full">
          <span
            className={`absolute left-1 text-xs font-medium transition-colors duration-200 ${
              currentLang === "en-US" ? "text-gray-900" : "text-gray-600"
            }`}
          >
            EN
          </span>
          <span
            className={`absolute right-1 text-xs font-medium transition-colors duration-200 ${
              currentLang === "pt-BR" ? "text-gray-900" : "text-gray-600"
            }`}
          >
            PT
          </span>
        </div>
      </div>
    </button>
  );
};
