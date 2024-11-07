import { AlertTriangle, Ban, Wifi, Server } from 'lucide-react';

const ErrorPage = ({
                     statusCode, title, message,
                   }: {
                     statusCode: string,
                     title: string,
                     message: string,
                  }) => {
  // Map status codes to specific UI configurations
  const errorConfig: {
    [customKey: string]: any,
  } = {
    "404": {
      icon: Ban,
      title: "Page Not Found",
      message: "The page you're looking for doesn't exist or has been moved.",
      color: "text-blue-600"
    },
    "500": {
      icon: Server,
      title: "Server Error",
      message: "Our servers are having issues right now. Please try again later.",
      color: "text-red-600"
    },
    "503": {
      icon: AlertTriangle,
      title: "Service Unavailable",
      message: "The service is temporarily unavailable. Please try again later.",
      color: "text-yellow-600"
    },
    offline: {
      icon: Wifi,
      title: "No Internet Connection",
      message: "Please check your internet connection and try again.",
      color: "text-gray-600"
    }
  };

  const config = errorConfig[`${statusCode}`] || errorConfig["500"];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <IconComponent
            className={`w-24 h-24 mx-auto ${config.color}`}
            strokeWidth={1.5}
          />
        </div>

        {/* Status Code */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          {statusCode}
        </h1>

        {/* Error Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {config.title || title}
        </h2>

        {/* Error Message */}
        <p className="text-gray-600 mb-8">
          {config.message || message}
        </p>
      </div>

      {/* Optional Support Section */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          Need help? <a href="/support" className="text-blue-600 hover:text-blue-500">Contact support</a>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;