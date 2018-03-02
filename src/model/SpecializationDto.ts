import { SpecializationPriceDto } from "./SpecializationPriceDto";

export class SpecializationDto {
    public id: number;
    public name: string;
    public specialization_code: string;
    public hospital_name: string;
    public hospital_id: number;
    public price: SpecializationPriceDto[];
    public updated_date: Date;
}