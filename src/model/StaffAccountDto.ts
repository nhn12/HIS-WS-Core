import { RoleDto } from "./RoleDto";

export class StaffAccountDto {
    public id: Number;
    public code: String;
    public username: String;
    public password: String;
    public status: String;
    public staff_id:number;
    public role:RoleDto;
}