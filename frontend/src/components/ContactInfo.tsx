import React from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, Building, Check, Star } from "lucide-react";

export const ContactInfo: React.FC = () => {
  const { t } = useTranslation();

  const contactItems = [
    {
      icon: Mail,
      title: t("contact.info.email"),
      value: "contact@liberpay.co",
      description: t("contact.info.descriptions.email"),
    },
    {
      icon: Phone,
      title: t("contact.info.phone"),
      value: "+1 (760) 683-4986",
      description: t("contact.info.descriptions.phone"),
    },
    {
      icon: Building,
      title: t("contact.info.address"),
      value: "Carlsbad, CA - USA",
      description: t("contact.info.descriptions.address"),
    },
  ];

  const benefits = [
    t("contact.info.benefits.noFees"),
    t("contact.info.benefits.support"),
    t("contact.info.benefits.security"),
    t("contact.info.benefits.instant"),
  ];

  return (
    <div className="h-full flex flex-col justify-between text-white">
      <div>
        <h3 className="text-2xl font-bold mb-6">
          {t("contact.info.getStarted")}
        </h3>
        <p className="text-blue-100 mb-8 text-lg">
          {t("contact.info.description")}
        </p>

        <div className="space-y-6">
          {contactItems.map((item, index) => {
            const isEmail = item.title === t("contact.info.email");
            const isPhone = item.title === t("contact.info.phone");

            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm">
                    {item.title}
                  </h4>
                  {isEmail ? (
                    <a
                      href={`mailto:${item.value}`}
                      className="text-white font-medium hover:text-blue-200 transition-colors duration-200 underline decoration-transparent hover:decoration-blue-200"
                    >
                      {item.value}
                    </a>
                  ) : isPhone ? (
                    <a
                      href={`tel:${item.value.replace(/\s+/g, "")}`}
                      className="text-white font-medium hover:text-blue-200 transition-colors duration-200 underline decoration-transparent hover:decoration-blue-200"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-blue-500">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-blue-900" />
            </div>
            <h4 className="font-bold text-white text-lg">
              {t("contact.info.whyChoose")}
            </h4>
          </div>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-blue-50 text-sm font-medium leading-relaxed">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
