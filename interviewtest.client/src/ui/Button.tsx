"use client";

import { ComponentPropsWithoutRef } from "react";

type BaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & BaseProps;

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "medium",
    disabled = false,
    className = "",
    ...otherProps
  } = props;

  const baseStyles =
    "border-2 font-bold inline-flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variantStyles = {
    primary:
      "border-green-600 bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    secondary:
      "border-gray-600 text-gray-800 hover:bg-gray-500 focus:ring-gray-600",
    danger:
      "border-red-600 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizeStyles = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-[0.99rem]",
    large: "px-6 py-3 text-lg",
  };

  const disabledStyles = "opacity-50 !cursor-not-allowed";

  const buttonClasses = `
  ${baseStyles} 
  ${variantStyles[variant]} 
  ${sizeStyles[size]} 
  ${disabled ? disabledStyles : ""}
  `;

  return (
    <button
      {...(otherProps as ButtonProps)}
      className={buttonClasses + className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
