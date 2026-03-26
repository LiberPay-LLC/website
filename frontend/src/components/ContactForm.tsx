import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ContactFormFields } from "./ContactFormFields";
import { ContactInfo } from "./ContactInfo";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { contactAPI, ContactFormData } from "../services/api";

export const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    industry: "",
    customIndustry: "",
    employeeCount: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const payload: ContactFormData = {
        name: formData.name,
        company_name: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        industry:
          formData.industry === "other"
            ? formData.customIndustry
            : formData.industry,
        employee_count: formData.employeeCount,
        location: formData.location,
      };

      const response = await contactAPI.submitContactForm(payload);

      if (response.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          companyName: "",
          phone: "",
          email: "",
          industry: "",
          customIndustry: "",
          employeeCount: "",
          location: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          response.message || "Something went wrong. Please try again."
        );
        console.error("Form submission failed:", response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background transition elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-50 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div
          className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 delay-200 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Contact Information Sidebar */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 lg:p-12">
              <ContactInfo />
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <ContactFormFields
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
                errorMessage={errorMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
