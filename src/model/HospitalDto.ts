import { StaffAccountDto } from './StaffAccountDto';
import { SpecializationDto } from './SpecializationDto';
import { WardDto } from './WardDto';
export class HospitalDto {
    public id: Number;
    public code: string;
    public name: string;

    public address: string;
    public phone: string;
    public image: string;
    public email: string;
    public status: number;
    public hospital_type: string;
    public last_visit: Date;

    public specialization: SpecializationDto[] = [];
    public ward: WardDto[] = [];

    public account: StaffAccountDto;

    public updated_date: Date;
}