export interface TeacherDto {
    id?: number;
    userId: number;
    employeeId: string;
    department?: string;
    profilePictureUrl?: string;
}

export type TeacherCreationDto = Omit<TeacherDto, 'id'>

export interface TeacherUpdateDto extends Partial<TeacherDto> {
    id: number;
}