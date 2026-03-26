import { useTranslation } from "react-i18next";
import { UserCheck, CreditCard, Zap } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const HowItWorks = () => {
  const { t } = useTranslation();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const steps = [
    {
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
      icon: UserCheck,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
    },
    {
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
      icon: CreditCard,
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-50 to-indigo-100",
    },
    {
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
      icon: Zap,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
    },
  ];

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-indigo-100 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Background transition elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-100 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("howItWorks.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={idx}
                className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isIntersecting
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 * (idx + 1)}ms` }}
              >
                {/* Background gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-20`}
                />

                {/* Content */}
                <div className="relative p-8 lg:p-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent size={32} className="text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl text-center font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <div
                    className="text-gray-600 text-center leading-relaxed space-y-3"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
