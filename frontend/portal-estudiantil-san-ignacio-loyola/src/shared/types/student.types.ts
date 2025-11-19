export interface StudentDto {
    id?: number;
    userId: number;
    studentCode: string;
    grade: string;
    section: string;
    profilePictureUrl?: string;
    birthDate?: string;
}

export type StudentCreationDto = Omit<StudentDto, 'id'>

export interface StudentUpdateDto extends Partial<StudentDto> {
    id: number;
}
