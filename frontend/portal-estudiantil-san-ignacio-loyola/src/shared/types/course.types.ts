import type { User } from "./user.types";

export interface Course {
  id: string;
  name: string;
  teacher: User;
  credits: number;
  students: User[];
  createdAt: string;
  updatedAt: string;
  // Properties from the component
  professor: string;
  progress: number;
  icon: string;
  color: "blue" | "green" | "purple" | "orange";
}