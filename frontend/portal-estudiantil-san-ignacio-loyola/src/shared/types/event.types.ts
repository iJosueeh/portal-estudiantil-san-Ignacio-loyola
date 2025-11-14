export type EventType = 'CLASS' | 'MEETING' | 'EXAM' | 'HOLIDAY' | 'OTHER';

export interface EventDto {
  id?: number;
  title: string;
  description?: string;
  fullDate: string;
  time?: string;
  location?: string;
  color?: string;
  type: EventType;
  courseId?: number;
}

export type EventCreationDto = Omit<EventDto, 'id'>

export interface EventUpdateDto extends Partial<EventDto> {
  id: number;
}

// UI Component types
export interface Event {
  id: string;
  day: string;
  month: string;
  title: string;
  subtitle?: string;
  time?: string;
  color: "red" | "blue" | "green";
}