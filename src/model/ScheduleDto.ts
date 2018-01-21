export class ScheduleDto {
    public id: Number;
    public schedule_code: String;
    public start_time: Date;
    public end_time: Date;

    public is_interval: boolean; //create interval
    public period: Number;

    public type: String;
    public reserve: {type: Boolean; default: false};
    public channel: String;
    public relational_code: string;
    public relational_name: string;

    //audit tbl
    public created_by: String;
    public created_date: Date;
    public updated_date: Date;
    public deleted_flag: Date;
}