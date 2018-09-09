import { StaffDto } from './StaffDto';
import { RoleDto } from "./RoleDto";

export class StaffAccountDto {
    public id: Number;
    public code: String;
    public username: String;
    public password: String;
    public status: number;
    public staff_id:number;
    public staff: StaffDto;
    public role:RoleDto;

    public last_visit: Date;
}