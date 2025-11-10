import React from "react";
import type { UserDto } from "./user.types";

export interface Course {
  id: string;
  name: string;
  teacher: UserDto;
  credits: number;
  students: UserDto[];
  createdAt: string;
  updatedAt: string;
  // Properties from the component
  professor: string;
  progress: number;
  icon: React.ElementType;
  color: "blue" | "green" | "purple" | "orange";
}