"use client";

import { cn } from "@/lib/utils";

interface PaymentMethodIconProps {
  name: string;
  className?: string;
}

export const PaymentMethodIcon = ({ name, className }: PaymentMethodIconProps) => {
  const iconProps = {
    className: cn("w-8 h-8", className),
    viewBox: "0 0 24 24",
    fill: "currentColor"
  };

  switch (name.toLowerCase()) {
    case "visa":
      return (
        <svg {...iconProps}>
          <path d="M9.5 6.5h5v11h-5z" fill="#1434CB"/>
          <path d="M9.5 6.5h5v11h-5z" fill="#1434CB"/>
          <path d="M10.5 7.5h3v9h-3z" fill="white"/>
          <path d="M11 8.5h1v7h-1z" fill="#1434CB"/>
          <text x="12" y="13" textAnchor="middle" fontSize="6" fill="#1434CB" fontWeight="bold">VISA</text>
        </svg>
      );
    
    case "mastercard":
      return (
        <svg {...iconProps}>
          <defs>
            <linearGradient id="mastercard-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EB001B"/>
              <stop offset="50%" stopColor="#F79E1B"/>
              <stop offset="100%" stopColor="#FF5F00"/>
            </linearGradient>
          </defs>
          <circle cx="9" cy="12" r="6" fill="url(#mastercard-gradient)"/>
          <circle cx="15" cy="12" r="6" fill="#F79E1B"/>
          <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" fill="none" stroke="url(#mastercard-gradient)" strokeWidth="0.5"/>
        </svg>
      );
    
    case "paypal":
      return (
        <svg {...iconProps}>
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.105-.633c-.99-5.05-4.349-6.797-8.647-6.797H9.342a.641.641 0 0 0-.633.74L11.74 20.597a.641.641 0 0 0 .633.74h4.606a.641.641 0 0 0 .633-.74l1.12-7.106a.641.641 0 0 1 .633-.74h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.292-1.867-.002-3.137-1.012-4.287z" fill="#003087"/>
        </svg>
      );
    
    case "apple pay":
      return (
        <svg {...iconProps}>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#000"/>
        </svg>
      );
    
    case "google pay":
      return (
        <svg {...iconProps}>
          <path d="M3.064 7.51c.843-2.52 2.976-4.5 5.436-5.436v5.436H3.064z" fill="#4285F4"/>
          <path d="M8.5 2.074c2.46.936 4.593 2.916 5.436 5.436H8.5V2.074z" fill="#34A853"/>
          <path d="M8.5 13.926V8.49h5.436c-.843 2.52-2.976 4.5-5.436 5.436z" fill="#FBBC05"/>
          <path d="M3.064 8.49H8.5v5.436c-2.46-.936-4.593-2.916-5.436-5.436z" fill="#EA4335"/>
        </svg>
      );
    
    case "blik":
      return (
        <svg {...iconProps}>
          <rect width="24" height="24" rx="4" fill="#FF6B35"/>
          <path d="M6 8h12v2H6V8zm0 3h12v2H6v-2zm0 3h8v2H6v-2z" fill="white"/>
          <text x="12" y="16" textAnchor="middle" fontSize="4" fill="white" fontWeight="bold">BLIK</text>
        </svg>
      );
    
    default:
      return (
        <div className={cn("w-8 h-8 rounded bg-gray-200 flex items-center justify-center", className)}>
          <span className="text-xs font-bold text-gray-600">{name.charAt(0)}</span>
        </div>
      );
  }
};

interface PaymentMethodsProps {
  className?: string;
  showTitle?: boolean;
}

export const PaymentMethods = ({ className, showTitle = true }: PaymentMethodsProps) => {
  const paymentMethods = [
    { name: "Visa", color: "hover:bg-blue-50" },
    { name: "Mastercard", color: "hover:bg-red-50" },
    { name: "PayPal", color: "hover:bg-yellow-50" },
    { name: "Apple Pay", color: "hover:bg-gray-50" },
    { name: "Google Pay", color: "hover:bg-green-50" },
    { name: "Blik", color: "hover:bg-orange-50" },
  ];

  return (
    <div className={className}>
      {showTitle && (
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
          <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Bezpieczne metody płatności
        </h3>
      )}
      <div className="grid grid-cols-3 gap-4">
        {paymentMethods.map((method, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center p-4 rounded-md border border-border transition-colors ${method.color}`}
          >
            <PaymentMethodIcon name={method.name} className="mb-2" />
            <span className="text-sm font-medium text-foreground text-center">{method.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-md border border-border">
        <div className="flex items-center gap-3">
          <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm font-medium text-foreground">
            Wszystkie płatności są szyfrowane i bezpieczne
          </span>
        </div>
      </div>
    </div>
  );
};
