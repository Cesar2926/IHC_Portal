import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

export function Input({ icon, placeholder, ...props }: InputProps) {
    return (
        <div className="relative flex items-center w-full max-w-md">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full py-2 pl-4 pr-10 text-white placeholder-white bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                {...props}
            />
            {icon && (
                <div className="absolute right-3 text-white">
                    {icon}
                </div>
            )}
        </div>
    );
}