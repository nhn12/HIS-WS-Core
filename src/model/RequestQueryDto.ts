export class RequestQueryDto {
    public resource: string;
    public filter: any;
    public joinTable: any[];
    public sort: any;
    public limit: number;
    public offset: number;

    constructor() {}


}