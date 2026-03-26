import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Contact form types
export interface ContactFormData {
  name: string;
  company_name: string;
  phone: string;
  email: string;
  industry: string;
  employee_count: string;
  location: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const contactAPI = {
  submitContactForm: async (
    data: ContactFormData
  ): Promise<ContactResponse> => {
    try {
      const response = await api.post("/contacts", data);
      if (response.status === 201 && response.data) {
        return {
          success: true,
          data: response.data,
        };
      }
      return {
        success: false,
        message: response.data?.message || "Unknown error",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message:
            (error.response?.data && error.response.data.message) ||
            "Network error occurred. Please try again.",
        };
      }
      return {
        success: false,
        message: "An unexpected error occurred.",
      };
    }
  },
};

export default api;
