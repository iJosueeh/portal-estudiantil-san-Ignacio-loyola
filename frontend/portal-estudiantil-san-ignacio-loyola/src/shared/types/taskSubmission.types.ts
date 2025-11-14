export type SubmissionStatus = 'PENDING_REVIEW' | 'REVIEWED' | 'LATE_SUBMISSION' | 'DRAFT';

export interface TaskSubmissionDto {
    id?: number;
    taskId: number;
    studentId: number;
    submissionDate: string;
    submissionContent?: string;
    status: SubmissionStatus;
    grade?: number;
    comments?: string;
}

export type TaskSubmissionCreationDto = Omit<TaskSubmissionDto, 'id'>

export interface TaskSubmissionUpdateDto extends Partial<TaskSubmissionDto> {
    id: number;
}
