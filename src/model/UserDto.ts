import { RoleDto } from './RoleDto';
import { UserType } from "./UserType";

export class UserDto {
    public id: Number;
    public fullname: string;
    public password: string;
    public username: string;
    public userType: UserType;
    public hospital_id: number;
    public role: RoleDto;
    public hash_password: string;
    public created: Date;
    public updated_date: Number;
}