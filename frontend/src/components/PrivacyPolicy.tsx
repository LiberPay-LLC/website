import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CalendarDays, Mail, MapPin, Building2 } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";

type PrivacySubsection = {
  title: string;
  bullets: string[];
};

type PrivacySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: PrivacySubsection[];
  contactEmail?: string;
  contactDetails?: {
    emailLabel: string;
    companyLabel: string;
    locationLabel: string;
    email: string;
    company: string;
    location: string;
  };
};

const buildInternalUrl = (path: string, lang: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(`${normalizedBase}${normalizedPath}`, window.location.origin);
  url.searchParams.set("lang", lang);
  return `${url.pathname}${url.search}`;
};

export const PrivacyPolicy: React.FC = () => {
  const { t, i18n } = useTranslation();

  const sections = t("privacyPolicy.sections", {
    returnObjects: true,
  }) as PrivacySection[];

  const homeUrl = buildInternalUrl("/", i18n.language);

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <a
            href={homeUrl}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("privacyPolicy.backHome")}
          </a>
          <LanguageToggle />
        </div>

        <article className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <header className="px-6 sm:px-10 py-8 border-b border-slate-200 bg-slate-50">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {t("privacyPolicy.title")}
            </h1>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2">
              <CalendarDays className="w-4 h-4" />
              <span>
                {t("privacyPolicy.effectiveDateLabel")}: {" "}
                {t("privacyPolicy.effectiveDateValue")}
              </span>
            </div>
          </header>

          <div className="px-6 sm:px-10 py-8 sm:py-10 space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-slate-700 leading-7">
                    {paragraph}
                  </p>
                ))}

                {section.subsections?.map((subsection) => (
                  <div key={subsection.title} className="space-y-3">
                    <h3 className="text-base font-semibold text-slate-900">
                      {subsection.title}
                    </h3>
                    <ul className="list-disc list-outside ml-6 space-y-2 text-slate-700">
                      {subsection.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {section.bullets && (
                  <ul className="list-disc list-outside ml-6 space-y-2 text-slate-700">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.contactEmail && (
                  <p className="text-slate-700">
                    <a
                      href={`mailto:${section.contactEmail}`}
                      className="font-semibold text-blue-700 hover:text-blue-800 underline underline-offset-2"
                    >
                      {section.contactEmail}
                    </a>
                  </p>
                )}

                {section.contactDetails && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <p className="flex items-center gap-2 text-slate-700">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span className="font-semibold">{section.contactDetails.emailLabel}:</span>
                      <a
                        href={`mailto:${section.contactDetails.email}`}
                        className="text-blue-700 hover:text-blue-800 underline underline-offset-2"
                      >
                        {section.contactDetails.email}
                      </a>
                    </p>
                    <p className="flex items-center gap-2 text-slate-700">
                      <Building2 className="w-4 h-4 text-slate-500" />
                      <span className="font-semibold">{section.contactDetails.companyLabel}:</span>
                      <span>{section.contactDetails.company}</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span className="font-semibold">{section.contactDetails.locationLabel}:</span>
                      <span>{section.contactDetails.location}</span>
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};