import type { ElementType } from "react";

export interface Stats {
  id: string;
  value: string | number;
  label: string;
  subtitle: string;
  icon: ElementType;
  color: "green" | "blue" | "orange" | "purple";
}