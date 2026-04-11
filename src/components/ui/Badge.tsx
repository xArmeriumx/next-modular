import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "danger" | "warning";
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "warning" }) => {
  const themes = {
    warning: "bg-primary/10 text-primary",
    success: "bg-green-500/20 text-green-400",
    danger: "bg-red-500/20 text-red-400",
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${themes[variant]}`}>
      {children}
    </span>
  );
};
