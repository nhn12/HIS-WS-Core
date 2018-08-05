import { MessageConst } from "../util/message-const";

export enum Status {
    _500,
    _400,
    _200,
    _401,
    _0,
    _1
}

export const STATUS_NAME = new Map<number, string>([
    [Status._500, "500"],
    [Status._400, "400"],
    [Status._401, "401"],
    [Status._200, "200"],
    [Status._0, "0"],
    [Status._1, "1"]
])

export class MessageContentModel {
    messageCode: string;
    message: string;
}

export class ResponseModel<T> {
    public status: string;
    public message: MessageContentModel = new MessageContentModel();
    public data: any;
    
    public constructor(_status: Status, _messageCode: string, data?: T)
    {
        this.status = STATUS_NAME.get(_status);
        this.message.messageCode = _messageCode;        
        this.message.message = MessageConst[_messageCode];
        this.data = data;
    }

    public setDataList(data: any) {
        this.data = data;
    }
}





