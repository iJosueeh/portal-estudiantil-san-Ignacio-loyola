import React from "react"; // Added import for React

export interface Stats {
  id: string;
  value: string | number;
  label: string;
  subtitle: string;
  icon: React.ElementType; // Use React.ElementType for icon components
  color: "green" | "blue" | "orange" | "purple" | "red";
}