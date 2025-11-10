export interface ParentDto {
    id?: number;
    userId: number;
    contactNumber?: string;
}

export type ParentCreationDto = Omit<ParentDto, 'id'>

export interface ParentUpdateDto extends Partial<ParentDto> {
    id: number;
}