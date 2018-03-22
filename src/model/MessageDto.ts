export class MessageDto {
    public type: MESSAGE_TYPE;
    public content: any;
}

export enum MESSAGE_TYPE {
    NEW_REGISTRATION,
    CONFIG_CHANGE
}