import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "amber" | "red" | "orange" | "grey" | "blue";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  green: "bg-brand-green-light text-brand-green border-brand-green/20",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-700 border-red-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  grey: "bg-brand-grey text-neutral-600 border-brand-border",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
};

const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

export default function Badge({
  children,
  variant = "grey",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium leading-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
