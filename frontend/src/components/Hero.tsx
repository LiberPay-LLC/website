import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Mail, CreditCard, CheckCircle } from "lucide-react";
import { scrollToSection } from "../utils/scroll";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const benefits = [
    {
      icon: CheckCircle,
      text: "No hidden fees",
      textPt: "Sem taxas ocultas",
    },
    {
      icon: CheckCircle,
      text: "Instant payments",
      textPt: "Pagamentos instantâneos",
    },
    {
      icon: CheckCircle,
      text: "Bank-level security",
      textPt: "Segurança bancária",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-xs font-medium shadow-sm transition-all duration-1000 ${
                isIntersecting
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              {t("hero.badge")}
            </div>

            {/* Main Headline */}
            <div
              className={`space-y-4 transition-all duration-1000 delay-200 ${
                isIntersecting
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block">{t("hero.title")}</span>
              </h1>

              <p className="text-xl md:text-2xl font-medium text-blue-600 max-w-2xl">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Description */}
            <p
              className={`text-lg text-gray-600 max-w-xl leading-relaxed transition-all duration-1000 delay-400 ${
                isIntersecting
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {t("hero.description")}
            </p>

            {/* Benefits */}
            <div
              className={`flex flex-wrap gap-4 justify-center lg:justify-start transition-all duration-1000 delay-600 ${
                isIntersecting
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <IconComponent className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>
                      {i18n.language === "pt-BR"
                        ? benefit.textPt
                        : benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 transition-all duration-1000 delay-800 ${
                isIntersecting
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Mail className="w-5 h-5" />
                {t("hero.ctaSecondary")}
              </button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div
            className={`relative transition-all duration-1000 delay-1000 ${
              isIntersecting
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative">
              {/* Main Card with Floating Elements */}
              <div className="relative max-w-48 lg:max-w-64 mx-auto">
                <div className="transform rotate-2 lg:rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img
                    src={`${import.meta.env.BASE_URL}card-mockup.png`}
                    alt="LiberPay Salary Card"
                    className="w-full h-auto rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl"
                  />
                </div>

                {/* Floating Elements - Visible on all devices */}
                <div className="absolute -top-8 -right-6 bg-green-100 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      {t("hero.instant")}
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-6 bg-blue-100 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      {t("hero.secure")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
