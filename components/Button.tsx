import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  icon,
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = "px-4 py-2.5 text-sm";
  
  const variants = {
    primary: "bg-stone-800 text-white hover:bg-stone-900 focus:ring-stone-600",
    secondary: "bg-amber-100 text-amber-900 hover:bg-amber-200 focus:ring-amber-500",
    outline: "border border-stone-300 text-stone-700 hover:bg-stone-50 focus:ring-stone-500",
    ghost: "text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:ring-stone-500"
  };

  return (
    <button 
      className={`${baseStyles} ${sizes} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};