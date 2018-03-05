import { Schema } from "mongoose";

export var RegistrationSchema: Schema = new Schema({
      id: Number,
      ngaydkkb: Date,
      mabv: String,

    // pre-registration
      trieuchung:String,
      ngaydk: Date,
      giodk: String,
      sdbhyt: Boolean,
      malichkb: Number,
      loaikb: String,
      mabs: String,
    

    // official-registration
      iddkkb: Number,
      madkkb: String,
      maba: String,
      mack: String,
      mapk: String,
      stt: Number,
      thanhtoan: Boolean,
      dongia: Number,
      official_malikb: String,
      is_accept: Boolean,
      lidotuchoi: String,



    // patient information
      hoten: String,
      namsinh: String,
      gioitinh: Number,
      matt: String,
      maqh: String,
      mapx: String,
      diachi: String,
      mabhyt: String,
      nbdbhyt: Date,
      hanbhyt:Date,
      mabvdkbd: String,
      email: String,
      sodt: String,

    // payment information
      has_paymnt: Boolean,
      token_paymnt: String,
      date_paymnt: Date,

    // extra-registration
      deleted_flag: Boolean,
      is_usercancel: Boolean,
      is_bvcancel: Boolean,

      //audit tbl
    created_date: Date,
    updated_date: Date
});