import { ProvinceDto } from "./ProvinceDto";

export class DistrictDto {
    public id: Number;
    public commune_id: Number;
    public name: String;
    public code: String;
    public is_interval: boolean; //create interval
    public province_id: ProvinceDto[];
}