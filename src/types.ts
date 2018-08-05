const TYPES = {
    AddressRepository: Symbol('AddressRepository'),
    AddressRepository2: Symbol('AddressRepository2'),
    AddressService: Symbol('AddressService'),
    RegistrationRepository: Symbol('RegistrationRepository'),
    RegistrationService: Symbol('RegistrationService'),

    CategoryService: Symbol('CategoryService'),
    CategoryRepository: Symbol('CategoryRepository'),
    
    UserRepository: Symbol('UserRepository'),
    UserService: Symbol('UserService'),

    ScheduleService: Symbol('ScheduleService'),
    BlueprintScheduleService: Symbol('BlueprintScheduleService'),

    ScheduleRepository: Symbol('ScheduleRepository'),
    BlueprintScheduleRepository: Symbol('BlueprintScheduleRepository'),

    //ward
    WardRepository:Symbol("WardRepository"),
    WardService:Symbol("WardService"),

    //speicaliztion
    SpecializationRepository:Symbol("SpecializationRepository"),
    SpecializationService:Symbol("SpecializationService"),

    //speicalization price
    SpecializationPriceRepository:Symbol("SpecializationPriceRepository"),
    SpecializationPriceService:Symbol("SpecializationPriceService"),

    //Type
    TypeRepository:Symbol("TypeRepository"),
    TypeService:Symbol("TypeService"),

    //Config
    ConfigRepository:Symbol("ConfigRepository"),
    ConfigService:Symbol("ConfigService"),

    //Province
    ProvinceRepository:Symbol("ProvinceRepository"),
    ProvinceService:Symbol("ProvinceService"),

    //District
    DistrictRepository:Symbol("DistrictRepository"),
    DistrictService:Symbol("DistrictService"),

    //Commune
    CommuneRepository:Symbol("CommuneRepository"),
    CommuneService:Symbol("CommuneService"),

    //Doctor
    DoctorService: Symbol("DoctorService"),
    DoctorRepository: Symbol("DoctorRepository"),

    //Log
    LogService: Symbol("LogService"),
    LogRepository: Symbol("LogRepository"),

    //Hospital
    HospitalService: Symbol("HospitalService"),
    HospitalRepository: Symbol("HospitalRepository"),

    //Operation
    OperationService: Symbol("OperationService"),
    OperationRepository: Symbol("OperationRepository"),

    //Staff
    StaffService: Symbol("StaffService"),
    StaffRepository: Symbol("StaffRepository"),

    //Staff
    StaffAccountService: Symbol("StaffAccountService"),
    StaffAccountRepository: Symbol("StaffAccountRepository"),

    //Role
    RoleService: Symbol("RoleService"),
    RoleRepository: Symbol("RoleRepository"),
    
    //utils section
    ResponseUtil: Symbol('ResponseUtil'),

    //counter
    CounterRepository: Symbol('CounterRepository'),

    //sync
    SyncService: Symbol('SyncService'),

    Controller: Symbol('Controller')
};

export default TYPES;
