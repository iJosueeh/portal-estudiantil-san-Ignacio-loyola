export interface GradeDto {
    id?: number;
    evaluationName: string;
    gradeValue: number;
    weight: number;
    period: string;
    studentId: number;
    courseId: number;
    teacherId: number;
}

export type GradeCreationDto = Omit<GradeDto, 'id'>

export interface GradeUpdateDto extends Partial<GradeDto> {
    id: number;
}
