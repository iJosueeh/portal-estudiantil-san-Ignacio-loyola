import type { Course } from "@/shared/types/course.types";

export interface StudentCourse extends Course {
  schedule: string;
  nextClass: string;
  materials: { name: string; url: string; type: 'file' | 'link' }[];
  videos: { name: string; url: string }[];
}