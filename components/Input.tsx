import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {label && <label className="text-sm font-medium text-stone-700">{label}</label>}
      <input 
        className={`flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className}`}
        {...props}
      />
    </div>
  );
};