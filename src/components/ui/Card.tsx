import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Card Component
 * เน้นการใช้ซ้ำและการทำ Glassmorphism
 */
export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`glass-card p-8 flex flex-col ${className}`}>
      {children}
    </div>
  );
};
