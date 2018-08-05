import { BlueprintScheduleRepository, BlueprintScheduleRepositoryImpl } from './repository/BlueprintScheduleRepository';
import { ScheduleRepositoryImpl } from './repository/ScheduleRepository';
import { ScheduleRepository } from './repository/ScheduleRepository';
import { ScheduleService, ScheduleServiceImpl } from './service/ScheduleService';
import { BlueprintScheduleService, BlueprintScheduleServiceImpl } from './service/BlueprintScheduleService';
import { ScheduleController } from './controller/ScheduleController';
import { BlueprintScheduleController } from './controller/BlueprintScheduleController';
import { StaffAccountRepositoryImpl, StaffAccountRepository } from './repository/StaffAccountRepository';
import { StaffAccountService, StaffAccountServiceImpl } from './service/StaffAccountService';
import { StaffAccountController } from './controller/StaffAccountController';
import { OperationController } from './controller/OperationControler';
import { HospitalController } from './controller/HospitalController';
import { StaffController } from './controller/StaffController';
import { RoleController } from './controller/RoleController';
import { OperationRepository, OperationRepositoryImpl } from './repository/OperationRepository';
import { HospitalService, HospitalServiceImpl } from './service/HospitalService';
import { OperationService, OperationServiceImpl } from './service/OperationService';
import { HospitalRepository, HospitalRepositoryImpl } from './repository/HospitalRepository';
import { RoleService, RoleServiceImpl } from './service/RoleRepository';
import { StaffRepository, StaffRepositoryImpl } from './repository/StaffRepository';
import { StaffService, StaffServiceImpl } from './service/StaffService';
import { DoctorController } from './controller/DoctorController';
import { CommuneController } from './controller/CommuneController';
import { DistrictController } from './controller/DistrictController';
import { SpecializationPriceController } from './controller/SpecializationPriceController';
import { ProvinceController } from './controller/ProvinceController';
import { SpecializationController } from './controller/SpecializationController';
import { WardController } from './controller/WardController';
import { TypeController } from './controller/TypeController';
import { DoctorRepository, DoctorRepositoryImpl } from './repository/DoctorRepository';
import { SyncService, SyncServiceImpl } from './service/SyncService';
import { SpecializationRepositoryImpl, SpecializationRepository } from './repository/SpecializationRepository';
import { SpecializationServiceImpl, SpecializationService } from './service/SpecializationService';
import { CounterRepository, CounterRepositoryImpl } from './repository/CounterRepository';
import { WardRepository, WardRepositoryImpl } from './repository/WardRepository';
import { WardService, WardServiceImpl } from './service/WardService';
import { ResponseUtil, ResponseUtilImp } from './util/response-utils';
import { RegistrationService, RegistrationServiceImpl } from './service/RegistrationService';
import {Container} from 'inversify';
import TYPES from './types';
import { RegistrationRepositoryImpl, RegistrationRepository } from './repository/RegistrationRepository';
import { UserService, UserServiceImpl } from './service/UserService';
import { UserRepository, UserRepositoryImpl } from './repository/UserRepository';
import { CategoryRepository, CategoryRepositoryImpl } from './repository/CategoryRepository';
import { CategoryService, CategoryServiceImpl } from './service/CategoryService';
import { SpecializationPriceServiceImpl, SpecializationPriceService } from './service/SpecializationPriceService';
import { SpecializationPriceRepository, SpecializationPriceRepositoryImpl } from './repository/SpecializationPriceRepository';
import { TypeService, TypeServiceImpl } from './service/TypeService';
import { TypeRepository, TypeRepositoryImpl } from './repository/TypeRepository';
import { ConfigService, ConfigServiceImpl } from './service/ConfigService';
import { ConfigRepository, ConfigRepositoryImpl } from './repository/ConfigRepository';
import { ProvinceService, ProvinceServiceImpl } from './service/ProvinceService';
import { ProvinceRepository, ProvinceRepositoryImpl } from './repository/ProvinceRepository';
import { DistrictService, DistrictServiceImpl } from './service/DistrictService';
import { DistrictRepository, DistrictRepositoryImpl } from './repository/DistrictRepository';
import { CommuneService, CommuneServiceImpl } from './service/CommuneService';
import { CommuneRepository, CommuneRepositoryImpl } from './repository/CommuneRepository';
import { DoctorService, DoctorServiceImpl } from './service/DoctorService';
import { LogRepositoryImpl, LogRepository } from './repository/LogRepository';
import { RegistrableController } from './controller/RegisterableController';
import { MedicalRegistrationController } from './controller/MedicalRegistrationController';
import { UserController } from './controller/UserController';
import { CategoryController } from './controller/CategoryController';
import { ConfigController } from './controller/ConfigController';
import { RoleRepository, RoleRepositoryImpl } from './repository/RoleRepository';

const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(MedicalRegistrationController);
container.bind<RegistrableController>(TYPES.Controller).to(BlueprintScheduleController);
container.bind<RegistrableController>(TYPES.Controller).to(ScheduleController);
container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<RegistrableController>(TYPES.Controller).to(CategoryController);
container.bind<RegistrableController>(TYPES.Controller).to(WardController);
container.bind<RegistrableController>(TYPES.Controller).to(SpecializationController);
container.bind<RegistrableController>(TYPES.Controller).to(SpecializationPriceController);
container.bind<RegistrableController>(TYPES.Controller).to(TypeController);
container.bind<RegistrableController>(TYPES.Controller).to(ConfigController);
container.bind<RegistrableController>(TYPES.Controller).to(ProvinceController);
container.bind<RegistrableController>(TYPES.Controller).to(DistrictController);
container.bind<RegistrableController>(TYPES.Controller).to(CommuneController);
container.bind<RegistrableController>(TYPES.Controller).to(DoctorController);
container.bind<RegistrableController>(TYPES.Controller).to(RoleController);
container.bind<RegistrableController>(TYPES.Controller).to(StaffController);
container.bind<RegistrableController>(TYPES.Controller).to(StaffAccountController);
container.bind<RegistrableController>(TYPES.Controller).to(HospitalController);
container.bind<RegistrableController>(TYPES.Controller).to(OperationController);
container.bind<RegistrationRepository>(TYPES.RegistrationRepository).to(RegistrationRepositoryImpl);
container.bind<RegistrationService>(TYPES.RegistrationService).to(RegistrationServiceImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);

//category section
container.bind<CategoryRepository>(TYPES.CategoryRepository).to(CategoryRepositoryImpl);
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryServiceImpl);

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

//Schedule
container.bind<BlueprintScheduleService>(TYPES.BlueprintScheduleService).to(BlueprintScheduleServiceImpl);
container.bind<BlueprintScheduleRepository>(TYPES.BlueprintScheduleRepository).to(BlueprintScheduleRepositoryImpl);

//Schedule
container.bind<ScheduleService>(TYPES.ScheduleService).to(ScheduleServiceImpl);
container.bind<ScheduleRepository>(TYPES.ScheduleRepository).to(ScheduleRepositoryImpl);

//log 
container.bind<LogRepository>(TYPES.LogRepository).to(LogRepositoryImpl);

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

//Doctor
container.bind<DoctorService>(TYPES.DoctorService).to(DoctorServiceImpl);
container.bind<DoctorRepository>(TYPES.DoctorRepository).to(DoctorRepositoryImpl);

//Staff
container.bind<StaffService>(TYPES.StaffService).to(StaffServiceImpl);
container.bind<StaffRepository>(TYPES.StaffRepository).to(StaffRepositoryImpl);

//Staff Account
container.bind<StaffAccountService>(TYPES.StaffAccountService).to(StaffAccountServiceImpl);
container.bind<StaffAccountRepository>(TYPES.StaffAccountRepository).to(StaffAccountRepositoryImpl);

//Hospital
container.bind<HospitalService>(TYPES.HospitalService).to(HospitalServiceImpl);
container.bind<HospitalRepository>(TYPES.HospitalRepository).to(HospitalRepositoryImpl);

//Operation
container.bind<OperationService>(TYPES.OperationService).to(OperationServiceImpl);
container.bind<OperationRepository>(TYPES.OperationRepository).to(OperationRepositoryImpl);

//Role
container.bind<RoleService>(TYPES.RoleService).to(RoleServiceImpl);
container.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepositoryImpl);

//counter 
container.bind<CounterRepository>(TYPES.CounterRepository).to(CounterRepositoryImpl)

// utils section
container.bind<ResponseUtil>(TYPES.ResponseUtil).to(ResponseUtilImp);

// sync service
container.bind<SyncService>(TYPES.SyncService).to(SyncServiceImpl);

export default container;
