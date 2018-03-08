import { SyncService } from './service/SyncService';
import { ScheduleRepository } from './repository/ScheduleRepository';
const TYPES = {
    AddressRepository: Symbol('AddressRepository'),
    AddressRepository2: Symbol('AddressRepository2'),
    AddressService: Symbol('AddressService'),
    RegistrationRepository: Symbol('RegistrationRepository'),
    MedicalRegistrationService: Symbol('MedicalRegistrationService'),

    CategoryService: Symbol('CategoryService'),
    CategoryRepository: Symbol('CategoryRepository'),
    
    UserRepository: Symbol('UserRepository'),
    UserService: Symbol('UserService'),

    //schedule
    ScheduleRepository:Symbol("ScheduleRepository"),
    ScheduleService:Symbol("ScheduleService"),

    
    //schedule
    BlueprintScheduleRepository:Symbol("BlueprintScheduleRepository"),
    BlueprintScheduleService:Symbol("BlueprintScheduleService"),

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
    
    //utils section
    ResponseUtil: Symbol('ResponseUtil'),

    //counter
    CounterRepository: Symbol('CounterRepository'),

    //sync
    SyncService: Symbol('SyncService'),

    Controller: Symbol('Controller')
};

export default TYPES;
