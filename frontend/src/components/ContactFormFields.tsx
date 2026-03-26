import React from "react";
import { useTranslation } from "react-i18next";
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  X,
} from "lucide-react";

interface FormData {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  industry: string;
  customIndustry: string;
  employeeCount: string;
  location: string;
}

interface ContactFormFieldsProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  errorMessage?: string;
}

// Reusable Input Field Component
const InputField: React.FC<{
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  required?: boolean;
  fullWidth?: boolean;
}> = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon: Icon,
  required = true,
  fullWidth = false,
}) => (
  <div className={fullWidth ? "col-span-full" : ""}>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label} {required && "*"}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base"
        placeholder={placeholder}
      />
    </div>
  </div>
);

// Reusable Select Field Component
const SelectField: React.FC<{
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  options,
  required = true,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label} {required && "*"}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Status Message Component
const StatusMessage: React.FC<{
  type: "success" | "error";
  message: string;
}> = ({ type, message }) => {
  const isSuccess = type === "success";
  const bgColor = isSuccess
    ? "bg-green-50 border-green-200 text-green-800"
    : "bg-red-50 border-red-200 text-red-800";
  const iconBg = isSuccess ? "bg-green-500" : "bg-red-500";
  const Icon = isSuccess ? Check : X;

  return (
    <div className={`mb-6 p-4 ${bgColor} border rounded-lg`}>
      <div className="flex items-center gap-2">
        <div
          className={`w-5 h-5 ${iconBg} rounded-full flex items-center justify-center`}
        >
          <Icon className="w-3 h-3 text-white" />
        </div>
        {message}
      </div>
    </div>
  );
};

export const ContactFormFields: React.FC<ContactFormFieldsProps> = ({
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  submitStatus,
  errorMessage,
}) => {
  const { t } = useTranslation();

  const industries = [
    { value: "retail", label: t("contact.form.options.industry.retail") },
    {
      value: "restaurant_food_service",
      label: t("contact.form.options.industry.restaurantFoodService"),
    },
    {
      value: "professional_services",
      label: t("contact.form.options.industry.professionalServices"),
    },
    {
      value: "healthcare",
      label: t("contact.form.options.industry.healthcare"),
    },
    {
      value: "manufacturing",
      label: t("contact.form.options.industry.manufacturing"),
    },
    {
      value: "construction",
      label: t("contact.form.options.industry.construction"),
    },
    {
      value: "technology",
      label: t("contact.form.options.industry.technology"),
    },
    { value: "education", label: t("contact.form.options.industry.education") },
    {
      value: "real_estate",
      label: t("contact.form.options.industry.realEstate"),
    },
    { value: "other", label: t("contact.form.options.industry.other") },
  ];

  const employeeRanges = [
    { value: "1-50", label: t("contact.form.options.employeeCount.range1to50") },
    {
      value: "51-100",
      label: t("contact.form.options.employeeCount.range51to100"),
    },
    {
      value: "100+",
      label: t("contact.form.options.employeeCount.range100plus"),
    },
  ];

  // Field configurations
  const inputFields = [
    {
      id: "name",
      name: "name",
      label: t("contact.form.name"),
      type: "text",
      icon: User,
      placeholder: t("contact.form.namePlaceholder"),
      fullWidth: true,
    },
    {
      id: "email",
      name: "email",
      label: t("contact.form.email"),
      type: "email",
      icon: Mail,
      placeholder: t("contact.form.emailPlaceholder"),
      fullWidth: true,
    },
    {
      id: "phone",
      name: "phone",
      label: t("contact.form.phone"),
      type: "tel",
      icon: Phone,
      placeholder: t("contact.form.phonePlaceholder"),
      fullWidth: false,
    },
    {
      id: "companyName",
      name: "companyName",
      label: t("contact.form.companyName"),
      type: "text",
      icon: Building,
      placeholder: t("contact.form.companyNamePlaceholder"),
      fullWidth: false,
    },
  ];

  const selectFields = [
    {
      id: "employeeCount",
      name: "employeeCount",
      label: t("contact.form.employeeCount"),
      placeholder: t("contact.form.employeeCountPlaceholder"),
      options: employeeRanges,
    },
    {
      id: "industry",
      name: "industry",
      label: t("contact.form.industry"),
      placeholder: t("contact.form.industryPlaceholder"),
      options: industries,
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field) => (
            <InputField
              key={field.id}
              {...field}
              value={formData[field.name as keyof FormData] as string}
              onChange={
                handleChange as (e: React.ChangeEvent<HTMLInputElement>) => void
              }
            />
          ))}
        </div>

        {/* Select Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectFields.map((field) => (
            <SelectField
              key={field.id}
              {...field}
              value={formData[field.name as keyof FormData] as string}
              onChange={
                handleChange as (
                  e: React.ChangeEvent<HTMLSelectElement>
                ) => void
              }
            />
          ))}
        </div>

        {/* Custom Industry Field */}
        {formData.industry === "other" && (
          <InputField
            id="customIndustry"
            name="customIndustry"
            label={t("contact.form.customIndustry")}
            value={formData.customIndustry}
            onChange={
              handleChange as (e: React.ChangeEvent<HTMLInputElement>) => void
            }
            placeholder={t("contact.form.customIndustryPlaceholder")}
            icon={Building}
            fullWidth={true}
          />
        )}

        {/* Location Field */}
        <InputField
          id="location"
          name="location"
          label={t("contact.form.location")}
          value={formData.location}
          onChange={
            handleChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
          placeholder={t("contact.form.locationPlaceholder")}
          icon={MapPin}
          fullWidth={true}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
        </button>

        {submitStatus === "success" && (
          <StatusMessage type="success" message={t("contact.form.success")} />
        )}

        {submitStatus === "error" && (
          <StatusMessage
            type="error"
            message={errorMessage || t("contact.form.error")}
          />
        )}
      </form>
    </div>
  );
};
