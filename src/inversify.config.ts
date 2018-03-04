import { SyncService, SyncServiceImpl } from './service/SyncService';
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
import { SpecializationPriceServiceImpl, SpecializationPriceService } from './service/SpecializationPriceService';
import { SpecializationPriceRepository, SpecializationPriceRepositoryImpl } from './repository/SpecializationPriceRepository';
import { SpecializationPriceController } from './controller/SpecializationPriceController';
import { TypeService, TypeServiceImpl } from './service/TypeService';
import { TypeRepository, TypeRepositoryImpl } from './repository/TypeRepository';
import { TypeController } from './controller/TypeController';
import { ConfigService, ConfigServiceImpl } from './service/ConfigService';
import { ConfigRepository, ConfigRepositoryImpl } from './repository/ConfigRepository';
import { ConfigController } from './controller/ConfigController';
import { ProvinceService, ProvinceServiceImpl } from './service/ProvinceService';
import { ProvinceRepository, ProvinceRepositoryImpl } from './repository/ProvinceRepository';
import { ProvinceController } from './controller/ProvinceController';
import { DistrictService, DistrictServiceImpl } from './service/DistrictService';
import { DistrictRepository, DistrictRepositoryImpl } from './repository/DistrictRepository';
import { DistrictController } from './controller/DistrictController';
import { CommuneService, CommuneServiceImpl } from './service/CommuneService';
import { CommuneRepository, CommuneRepositoryImpl } from './repository/CommuneRepository';
import { CommuneController } from './controller/CommuneController';

const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(MedicalRegistrationController);
container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<RegistrableController>(TYPES.Controller).to(CategoryController);
container.bind<RegistrableController>(TYPES.Controller).to(ScheduleController);
container.bind<RegistrableController>(TYPES.Controller).to(WardController);
container.bind<RegistrableController>(TYPES.Controller).to(SpecializationController);
container.bind<RegistrableController>(TYPES.Controller).to(BlueprintScheduleController);
container.bind<RegistrableController>(TYPES.Controller).to(SpecializationPriceController);
container.bind<RegistrableController>(TYPES.Controller).to(TypeController);
container.bind<RegistrableController>(TYPES.Controller).to(ConfigController);
container.bind<RegistrableController>(TYPES.Controller).to(ProvinceController);
container.bind<RegistrableController>(TYPES.Controller).to(DistrictController);
container.bind<RegistrableController>(TYPES.Controller).to(CommuneController);


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

//specializationPrice
container.bind<SpecializationPriceService>(TYPES.SpecializationPriceService).to(SpecializationPriceServiceImpl);
container.bind<SpecializationPriceRepository>(TYPES.SpecializationPriceRepository).to(SpecializationPriceRepositoryImpl);

//type
container.bind<TypeService>(TYPES.TypeService).to(TypeServiceImpl);
container.bind<TypeRepository>(TYPES.TypeRepository).to(TypeRepositoryImpl);

//config
container.bind<ConfigService>(TYPES.ConfigService).to(ConfigServiceImpl);
container.bind<ConfigRepository>(TYPES.ConfigRepository).to(ConfigRepositoryImpl);

//province
container.bind<ProvinceService>(TYPES.ProvinceService).to(ProvinceServiceImpl);
container.bind<ProvinceRepository>(TYPES.ProvinceRepository).to(ProvinceRepositoryImpl);

//district
container.bind<DistrictService>(TYPES.DistrictService).to(DistrictServiceImpl);
container.bind<DistrictRepository>(TYPES.DistrictRepository).to(DistrictRepositoryImpl);

//commune
container.bind<CommuneService>(TYPES.CommuneService).to(CommuneServiceImpl);
container.bind<CommuneRepository>(TYPES.CommuneRepository).to(CommuneRepositoryImpl);

//counter 
container.bind<CounterRepository>(TYPES.CounterRepository).to(CounterRepositoryImpl)


// utils section
container.bind<ResponseUtil>(TYPES.ResponseUtil).to(ResponseUtilImp);

// sync service
container.bind<SyncService>(TYPES.SyncService).to(SyncServiceImpl);

export default container;
