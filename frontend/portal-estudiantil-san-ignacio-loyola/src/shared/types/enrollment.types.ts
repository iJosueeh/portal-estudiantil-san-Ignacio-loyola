export type EnrollmentStatus = 'ACTIVE' | 'COMPLETED' | 'DROPPED';

export interface EnrollmentDto {
    id?: number;
    studentId: number;
    courseId: number;
    enrollmentDate: string;
    status: EnrollmentStatus;
}

export type EnrollmentCreationDto = Omit<EnrollmentDto, 'id'>

export interface EnrollmentUpdateDto extends Partial<EnrollmentDto> {
    id: number;
}
