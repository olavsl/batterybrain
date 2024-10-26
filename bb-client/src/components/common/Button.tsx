import React from 'react';

// Define the button properties interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'transparent' | 'danger' | 'disabled';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  ariaLabel?: string;
}

// Define CSS classes based on the button's size and variant
const sizeClasses = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-4 py-2 text-md',
  large: 'px-5 py-3 text-lg',
};

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  transparent: 'bg-transparent text-blue-600 hover:bg-blue-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
};

const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  variant = 'primary',
  leftIcon,
  rightIcon,
  children,
  ariaLabel,
  ...props
}) => {
  const isDisabled = variant === 'disabled' || props.disabled;
  const combinedClasses = `${sizeClasses[size]} ${variantClasses[variant]} ${
    isDisabled ? 'cursor-not-allowed opacity-60' : ''
  }`;

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md font-semibold ${combinedClasses}`}
      aria-label={
        ariaLabel || (typeof children === 'string' ? children : undefined)
      }
      disabled={isDisabled}
      {...props}
    >
      {leftIcon && <span className="mr-1">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-1">{rightIcon}</span>}
    </button>
  );
};

export default Button;
