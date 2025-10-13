export interface Event {
  id: string;
  day: string;
  month: string;
  title: string;
  subtitle?: string;
  time?: string;
  color: "red" | "blue" | "green";
}