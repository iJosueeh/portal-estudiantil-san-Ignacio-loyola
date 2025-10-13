export interface StudentCourse {
  id: string;
  name: string;
  professor: string;
  schedule: string;
  nextClass: string;
  materials: number;
  videos: number;
  students: number;
  progress: number;
  color: "blue" | "green" | "purple" | "orange";
  icon: string; // Added icon property
}