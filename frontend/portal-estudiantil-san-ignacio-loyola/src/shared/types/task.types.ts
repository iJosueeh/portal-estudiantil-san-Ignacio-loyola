export interface TaskDto {
    id?: number;
    title: string;
    description?: string;
    dueDate: string;
    maxGrade: number;
    courseId: number;
    teacherId: number;
}

export type TaskCreationDto = Omit<TaskDto, 'id'>

export interface TaskUpdateDto extends Partial<TaskDto> {
    id: number;
}
