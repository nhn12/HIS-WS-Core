export class BlueprintScheduleDto {
    public id: Number;
    public start_time: String;
    public end_time: String;
    public ward_id: Number;
    public doctor_id: Number;
    public specialization_id: Number;
    public period: Number;

    public has_sync: {type: Boolean; default: false};

    //audit tbl
    public created_by: String;
    public created_date: Date;
    public updated_date: Date;
    public deleted_flag: Date;
}