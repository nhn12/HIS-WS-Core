export class RegistrationDto {
    public id: Number;
    public ngaydkkb: Date;
    public mabv: string;

    // pre-registration
    public trieuchung:string;
    public ngaydk: Date;
    public giodk: string;
    public sdbhyt: boolean;
    public malichkb: number;
    public loaikb: string;
    public mabs: string;
    

    // official-registration
    public iddkkb: number;
    public madkkb: string;
    public maba: string;
    public mack: string;
    public mapk: string;
    public ngaykb: Date;
    public gia: Number;
    public tenck: string;
    public tenpk: string;
    public stt: number;
    public thanhtoan: boolean;
    public dongia: number;
    public official_malikb: string;
    public is_accept: boolean;
    public lidotuchoi: string;



    // patient information
    public hoten: string;
    public namsinh: string;
    public gioitinh: string;
    public matt: string;
    public maqh: string
    public mapx: string;
    public diachi: string;
    public mabhyt: string;
    public nbdbhyt: Date;
    public hanbhyt:Date;
    public mabvdkbd: string;
    public email: string;
    public sodt: string;

    // payment information
    public has_payment: boolean;
    public token_payment: string;
    public date_payment: Date;

    // extra-registration
    public deleted_flag: boolean;
    public is_usercancel: boolean;
    public is_bvcancel: boolean;

    //audit tbl
    public created_date: Date;
    public updated_date: Date;
}