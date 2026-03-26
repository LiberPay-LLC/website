import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronRight } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { scrollToSection, scrollToTop } from "../utils/scroll";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { key: "howItWorks", href: "#how-it-works" },
    { key: "benefits", href: "#benefits" },
    { key: "about", href: "#about" },
  ];

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100; // Offset for header height
      let foundActive = false;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            foundActive = true;
            break;
          }
        }
      }

      // Clear active section if not in any section or at top
      if (!foundActive || scrollPosition < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest(".mobile-menu-content")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleGetStarted = () => {
    scrollToSection("contact");
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    scrollToTop();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogoClick}
                className="hover:opacity-80 transition-all duration-200 hover:scale-105"
                aria-label="Go to top"
              >
                <img
                  src={`${import.meta.env.BASE_URL}logo-full-name-no-background.png`}
                  alt="LiberPay"
                  className="h-6 w-auto"
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative text-sm font-medium font-open-sans transition-all duration-200 px-3 py-2 rounded-lg group ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(`nav.${item.key}`)}
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                    )}
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
                  </button>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageToggle />
              <button
                onClick={handleGetStarted}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium font-open-sans hover:bg-blue-700 hover:shadow-lg transition-all duration-200 min-w-[124px] transform hover:scale-105 active:scale-95"
              >
                {t("nav.getStarted")}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <LanguageToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 mobile-menu-button"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40">
          <div className="absolute top-16 left-0 right-0 bg-white shadow-xl border-b border-gray-100 mobile-menu-content animate-in slide-in-from-top-2 duration-300">
            <div className="px-4 py-6">
              <nav
                className="space-y-2"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {navItems.map((item, index) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <button
                      key={item.key}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center justify-between p-4 text-left text-lg font-medium rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                          : "text-gray-900 hover:bg-gray-50"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{t(`nav.${item.key}`)}</span>
                      <ChevronRight
                        className={`w-5 h-5 transition-all duration-200 ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-400 group-hover:text-blue-600"
                        }`}
                      />
                    </button>
                  );
                })}

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={handleGetStarted}
                    className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-200 min-w-[124px] transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {t("nav.getStarted")}
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
