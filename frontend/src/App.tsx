import { useTranslation } from "react-i18next";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Benefits } from "./components/Benefits";
import { Footer } from "./components/Footer";
import { AboutUs } from "./components/AboutUs";
import { HowItWorks } from "./components/HowItWorks";
import { ContactForm } from "./components/ContactForm";
import { LoadingScreen } from "./components/LoadingScreen";
import { useEffect, useState } from "react";
import { BibleVerse } from "./components/BibleVerse";
import { PrivacyPolicy } from "./components/PrivacyPolicy";

const getRelativePath = (pathname: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;

  if (normalizedBase && normalizedBase !== "/" && pathname.startsWith(normalizedBase)) {
    const strippedPath = pathname.slice(normalizedBase.length);
    return strippedPath.startsWith("/") ? strippedPath : `/${strippedPath}`;
  }

  return pathname;
};

function App() {
  const { t, ready, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const path = getRelativePath(window.location.pathname).replace(/\/+$/, "") || "/";
  const isPrivacyPage = path === "/privacy-policy";

  // Initialize language from URL on app start
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");

    if (langParam && (langParam === "en-US" || langParam === "pt-BR")) {
      i18n.changeLanguage(langParam);
    } else if (!langParam) {
      // Set default language in URL if none exists
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("lang", "en-US");
      window.history.replaceState({}, "", newUrl.toString());
      i18n.changeLanguage("en-US");
    }
  }, [i18n]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  useEffect(() => {
    if (ready) {
      document.title = isPrivacyPage
        ? t("privacyPolicy.pageTitle")
        : t("pageTitle");
    }
  }, [ready, t, isPrivacyPage]);

  if (isPrivacyPage) {
    return <PrivacyPolicy />;
  }

  return (
    <div className="min-h-screen bg-white">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header />
        <Hero />
        <HowItWorks />
        <Benefits />
        <AboutUs />
        <ContactForm />
        <BibleVerse />
        <Footer />
      </div>
    </div>
  );
}

export default App;
