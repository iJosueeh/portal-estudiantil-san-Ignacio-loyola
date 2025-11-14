export interface MessageDto {
    id?: number;
    senderId: number;
    recipientId: number;
    subject: string;
    body: string;
    sentDate: string;
    isRead: boolean;
}

export type MessageCreationDto = Omit<MessageDto, 'id' | 'sentDate' | 'isRead'>

export interface MessageUpdateDto extends Partial<MessageDto> {
    id: number;
}
