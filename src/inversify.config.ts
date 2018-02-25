import { BlueprintScheduleRepository, BlueprintScheduleRepositoryImpl } from './repository/BlueprintScheduleRepository';
import { SpecializationRepositoryImpl, SpecializationRepository } from './repository/SpecializationRepository';
import { SpecializationServiceImpl, SpecializationService } from './service/SpecializationService';
import { CounterRepository, CounterRepositoryImpl } from './repository/CounterRepository';
import { WardRepository, WardRepositoryImpl } from './repository/WardRepository';
import { WardController } from './controller/WardController';
import { WardService, WardServiceImpl } from './service/WardService';
import { ResponseUtil, ResponseUtilImp } from './util/ResponseUtils';
import { MedicalRegistrationService, MedicalRegistrationServiceImpl } from './service/MedicalRegistrationService';
import {Container} from 'inversify';
import TYPES from './types';
import {AddressService, AddressServiceImpl} from './service/AddressService';
import {AddressRepository, AddressRepositoryImplMongo, AddressRepositoryImplDb} from './repository/AddressRepository';
import {RegistrableController} from './controller/RegisterableController';
import { RegistrationRepositoryImpl, RegistrationRepository } from './repository/RegistrationRepository';
import { MedicalRegistrationController } from './controller/MedicalRegistrationController';
import { UserController } from './controller/UserController';
import { UserService, UserServiceImpl } from './service/UserService';
import { UserRepository, UserRepositoryImpl } from './repository/UserRepository';
import { CategoryRepository, CategoryRepositoryImpl } from './repository/CategoryRepository';
import { CategoryService, CategoryServiceImpl } from './service/CategoryService';
import { CategoryController } from './controller/CategoryController';
import { ScheduleRepository, ScheduleRepositoryImpl } from './repository/ScheduleRepository';
import { ScheduleService, ScheduleServiceImpl } from './service/ScheduleService';
import { ScheduleController } from './controller/ScheduleController';
import { SpecializationController } from './controller/SpecializationController';
import { BlueprintScheduleService, BlueprintScheduleServiceImpl } from './service/BlueprintScheduleService';
import { BlueprintScheduleController } from './controller/BlueprintScheduleController';

const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(MedicalRegistrationController);
container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<RegistrableController>(TYPES.Controller).to(CategoryController);
container.bind<RegistrableController>(TYPES.Controller).to(ScheduleController);
container.bind<RegistrableController>(TYPES.Controller).to(WardController);
container.bind<RegistrableController>(TYPES.Controller).to(SpecializationController);
container.bind<RegistrableController>(TYPES.Controller).to(BlueprintScheduleController);




container.bind<AddressService>(TYPES.AddressService).to(AddressServiceImpl);
container.bind<AddressRepository>(TYPES.AddressRepository).to(AddressRepositoryImplMongo);
container.bind<AddressRepository>(TYPES.AddressRepository2).to(AddressRepositoryImplDb);
container.bind<RegistrationRepository>(TYPES.RegistrationRepository).to(RegistrationRepositoryImpl);
container.bind<MedicalRegistrationService>(TYPES.MedicalRegistrationService).to(MedicalRegistrationServiceImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);


//category section
container.bind<CategoryRepository>(TYPES.CategoryRepository).to(CategoryRepositoryImpl);
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryServiceImpl);

//schedule
container.bind<ScheduleRepository>(TYPES.ScheduleRepository).to(ScheduleRepositoryImpl);
container.bind<ScheduleService>(TYPES.ScheduleService).to(ScheduleServiceImpl);

//blueprint-schedule
container.bind<BlueprintScheduleRepository>(TYPES.BlueprintScheduleRepository).to(BlueprintScheduleRepositoryImpl);
container.bind<BlueprintScheduleService>(TYPES.BlueprintScheduleService).to(BlueprintScheduleServiceImpl);

//ward
container.bind<WardService>(TYPES.WardService).to(WardServiceImpl);
container.bind<WardRepository>(TYPES.WardRepository).to(WardRepositoryImpl);

//specialization
container.bind<SpecializationService>(TYPES.SpecializationService).to(SpecializationServiceImpl);
container.bind<SpecializationRepository>(TYPES.SpecializationRepository).to(SpecializationRepositoryImpl);

//counter 
container.bind<CounterRepository>(TYPES.CounterRepository).to(CounterRepositoryImpl)


// utils section
container.bind<ResponseUtil>(TYPES.ResponseUtil).to(ResponseUtilImp);

export default container;
