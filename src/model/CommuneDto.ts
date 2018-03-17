import { DistrictDto } from "./DistrictDto";

export class CommuneDto {
    public id: Number;
    public name: String;
    public code: String;
    public district_id: DistrictDto[];
    public updated_date: Number;
}