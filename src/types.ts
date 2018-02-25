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

    //utils section
    ResponseUtil: Symbol('ResponseUtil'),

    //counter
    CounterRepository: Symbol('CounterRepository'),

    Controller: Symbol('Controller')
};

export default TYPES;
