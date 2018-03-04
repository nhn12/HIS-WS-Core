export class SpecializationPriceDto {
    public id: Number;
    public specialization_id: Number;
    public price: Number;
    public type: Number;
    public updated_date: Number; 

    public from_date: Date;
    public to_date: Date;
    public deleted_flag: { type: Boolean, default: false }
}