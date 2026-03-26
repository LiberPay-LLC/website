import { useTranslation } from "react-i18next";
import { Sparkles, TrendingUp, Shield, Users, Eye, Zap } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const AboutUs = () => {
  const { t } = useTranslation();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const values = [
    {
      icon: Sparkles,
      key: "innovation",
    },
    {
      icon: Eye,
      key: "transparency",
    },
    {
      icon: Shield,
      key: "security",
    },
    {
      icon: Users,
      key: "accessibility",
    },
    {
      icon: Zap,
      key: "efficiency",
    },
    {
      icon: TrendingUp,
      key: "customerFocus",
    },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-20 bg-gradient-to-br from-indigo-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Background transition elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main content */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t("about.title")}
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed">
              {t("about.description")}
            </p>
          </div>
        </div>

        {/* Company values */}
        <div className="mb-12">
          <h3
            className={`text-2xl font-bold text-center text-gray-900 mb-8 transition-all duration-1000 delay-200 ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {t("about.values.title")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {values.map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={idx}
                  className={`group bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 ${
                    isIntersecting
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${300 * (idx + 1)}ms` }}
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={20} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                    {t(`about.values.${value.key}.title`)}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {t(`about.values.${value.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
