export class BlueprintScheduleDto {
    public id: Number;
    public start_time: String;
    public end_time: String;
    public doctor_id: Number;
    public specialization_id: Number;
    public hospital_id: number;
    public period: Number;

    public date: Date;
    public time: {ward_id: number, start_time: string, end_time: string}[];

    public has_sync: {type: Boolean; default: false};

    //audit tbl
    public created_by: String;
    public created_date: Date;
    public updated_date: Number;
    public deleted_flag: Boolean;
}