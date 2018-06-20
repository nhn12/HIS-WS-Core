export class TongquatCategoryDto {
    public id: Number;
    public code: String;
    public name: String;
    public note: String;
    public required: boolean;
    public type: string;
    public alias: string;
    public order: number;
    public has_multifield: boolean;//{type: Boolean, default: false};
    public number_field: number;  //{type: Number, default: 1};

    public description: String;
    public allow_description: boolean;
    public unit: String;
    public allow_unit: Boolean;
    
    public updated_date: Number;
}