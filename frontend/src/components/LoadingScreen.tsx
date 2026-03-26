import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500);
          }, 200);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-500">
      <div className="text-center">
        {/* Logo and Icon */}
        <div className="mb-8">
          <img
            src="/logo-no-background.png"
            alt="LiberPay"
            className="h-10 w-auto mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium">
            Loading your experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          <p className="text-sm text-gray-500 font-medium">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
};
