import React from "react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ExternalLink,
} from "lucide-react";
import { scrollToSection } from "../utils/scroll";

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  const buildInternalUrl = (path: string) => {
    const base = import.meta.env.BASE_URL || "/";
    const normalizedBase = base.endsWith("/") ? base : `${base}/`;
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
    const url = new URL(
      `${normalizedBase}${normalizedPath}`,
      window.location.origin
    );
    url.searchParams.set("lang", i18n.language);
    return `${url.pathname}${url.search}`;
  };

  const footerSections = [
    {
      title: t("footer.company"),
      links: [
        {
          key: "about",
          href: "#about",
          onClick: () => scrollToSection("about"),
        },
        {
          key: "benefits",
          href: "#benefits",
          onClick: () => scrollToSection("benefits"),
        },
        {
          key: "howItWorks",
          href: "#how-it-works",
          onClick: () => scrollToSection("how-it-works"),
        },
        {
          key: "contact",
          href: "#contact",
          onClick: () => scrollToSection("contact"),
        },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        {
          key: "privacy",
          href: buildInternalUrl("/privacy-policy"),
        },
      ],
    },
  ];

  const socialLinks = [
    // { icon: Facebook, href: "#", label: "Facebook" },
    // { icon: Twitter, href: "#", label: "Twitter" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/liberpay-corporate",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/liberpaycorporate/",
      label: "Instagram",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Company Info */}
            <div>
              {/* Logo and Description */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={`${import.meta.env.BASE_URL}logo-full-name-no-background.png`}
                    alt="LiberPay"
                    className="h-8 w-auto brightness-0 invert"
                  />
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t("footer.description")}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a className="text-sm">Carlsbad, CA - USA</a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a
                    href={`tel: +1 (760) 683-4986`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    +1 (760) 683-4986
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a
                    href={`mailto:contact@liberpay.co`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    contact@liberpay.co
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold text-white mb-4">
                  {t("footer.social")}
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                        aria-label={social.label}
                      >
                        <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {footerSections.map((section, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.key}>
                          <a
                            href={link.href}
                            onClick={link.onClick}
                            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                          >
                            {link.key === "howItWorks"
                              ? t("nav.howItWorks")
                              : t(`footer.${link.key}`)}
                            {link.external && (
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © 2025 LiberPay. {t("footer.rights")} • {t("footer.tagline")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
