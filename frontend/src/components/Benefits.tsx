import React from "react";
import { useTranslation } from "react-i18next";
import {
  DollarSign,
  FileX,
  Shield,
  Zap,
  CreditCard,
  Smartphone,
  BarChart3,
  Percent,
} from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const Benefits: React.FC = () => {
  const { t } = useTranslation();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const companyBenefits = [
    {
      icon: DollarSign,
      key: "costReduction",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100",
    },
    {
      icon: FileX,
      key: "lessBureaucracy",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-100",
    },
    {
      icon: Shield,
      key: "compliance",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-100",
    },
    {
      icon: Zap,
      key: "instantPayments",
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-50 to-amber-100",
    },
  ];

  const employeeBenefits = [
    {
      icon: CreditCard,
      key: "withdrawalsAndPurchases",
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-100",
    },
    {
      icon: Smartphone,
      key: "immediateAccess",
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-100",
    },
    {
      icon: BarChart3,
      key: "digitalManagement",
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-50 to-cyan-100",
    },
    {
      icon: Percent,
      key: "noHiddenFees",
      gradient: "from-red-500 to-pink-600",
      bgGradient: "from-red-50 to-pink-100",
    },
  ];

  return (
    <section
      ref={ref}
      id="benefits"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-indigo-50 relative overflow-hidden"
    >
      {/* Background transition elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-50 to-transparent"></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t("benefits.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("benefits.subtitle")}
          </p>
        </div>

        {/* Company Benefits */}
        <div className="mb-20">
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-200 ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t("benefits.companyBenefits.title")}
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.key}
                  className={`group relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 ${
                    isIntersecting
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${300 * (index + 1)}ms` }}
                >
                  {/* Background gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-20`}
                  />

                  {/* Content */}
                  <div className="relative p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-gray-900 mb-4 leading-tight text-center group-hover:text-gray-800 transition-colors duration-300">
                      {t(`benefits.companyBenefits.${benefit.key}.title`)}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-center">
                      {t(`benefits.companyBenefits.${benefit.key}.description`)}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.gradient}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Employee Benefits */}
        <div>
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-400 ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t("benefits.employeeBenefits.title")}
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {employeeBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.key}
                  className={`group relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 ${
                    isIntersecting
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${500 + 300 * index}ms` }}
                >
                  {/* Background gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-20`}
                  />

                  {/* Content */}
                  <div className="relative p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-gray-900 mb-4 leading-tight text-center group-hover:text-gray-800 transition-colors duration-300">
                      {t(`benefits.employeeBenefits.${benefit.key}.title`)}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-center">
                      {t(
                        `benefits.employeeBenefits.${benefit.key}.description`
                      )}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.gradient}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
