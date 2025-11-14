import type { UserRole } from "./user.types";

export interface AnnouncementDto {
    id?: number;
    title: string;
    content: string;
    date?: string;
    authorId: number;
    targetRole: UserRole;
    courseId?: number;
}

export type AnnouncementCreationDto = Omit<AnnouncementDto, 'id' | 'date'>

export interface AnnouncementUpdateDto extends Partial<AnnouncementDto> {
    id: number;
}

// UI Component types
export interface Announcement {
    id: string;
    title: string;
    content: string;
    author: {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
    };
    createdAt: string;
    audience: 'all' | 'students' | 'admins' | 'teachers' | 'parents';
}