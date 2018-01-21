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

    //utils section
    ResponseUtil: Symbol('ResponseUtil'),

    Controller: Symbol('Controller')
};

export default TYPES;
