import { DoctorController } from './controller/DoctorController';
import { DoctorRepository, DoctorRepositoryImpl } from './repository/DoctorRepository';
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
// import {AddressService, AddressServiceImpl} from './service/AddressService';
// import {AddressRepository, AddressRepositoryImplMongo, AddressRepositoryImplDb} from './repository/AddressRepository';
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
import { DoctorService, DoctorServiceImpl } from './service/DoctorService';
import { LogRepositoryImpl, LogRepository } from './repository/LogRepository';
import { ReasonCategoryController } from './controller/ReasonIllCategoryController';
import { ReasonCategoryRepositoryImpl, ReasonCategoryRepository } from './repository/ReasonCategoryRepository';
import { ReasonCategoryServiceImpl, ReasonCategoryService } from './service/ReasonCategoryService';
import { IcdCategoryController } from './controller/IcdCategoryController';
import { XutriCategoryController } from './controller/XutriCategoryController';
import { TiencanCategoryController } from './controller/TiencanCategoryController';
import { TongquatCategoryController } from './controller/TongquatCategoryController';
import { TrieuchungCategoryController } from './controller/TrieuchungCategoryController';
import { DiseaseCategoryController } from './controller/DiseaseCategoryController';
import { IcdCategoryService, IcdCategoryServiceImpl } from './service/IcdCategoryService';
import { IcdCategoryRepository, IcdCategoryRepositoryImpl } from './repository/IcdCategoryRepository';
import { TrieuchungCategoryService, TrieuchungCategoryServiceImpl } from './service/TrieuchungCategoryService';
import { TrieuchungCategoryRepository, TrieuchungCategoryRepositoryImpl } from './repository/TrieuchungCategoryRepository';
import { TiencanCategoryRepository, TiencanCategoryRepositoryImpl } from './repository/TiencanCategoryRepository';
import { TiencanCategoryService, TiencanCategoryServiceImpl } from './service/TiencanCategoryService';
import { DiseaseCategoryService, DiseaseCategoryServiceImpl } from './service/DiseaseCategoryService';
import { DiseaseCategoryRepositoryImpl, DiseaseCategoryRepository } from './repository/DiseaseCategoryRepository';
import { XutriCategoryService } from './service/XutriCategoryService';
import { XutriCategoryRepository, XutriCategoryRepositoryImpl } from './repository/XutriCategoryRepository';
import { TongquatCategoryService, TongquatCategoryServiceImpl } from './service/TongquatCategoryService';
import { TongquatCategoryRepository, TongquatCategoryRepositoryImpl } from './repository/TongquatCategoryRepository';
import { CacBoPhanCategoryController } from './controller/CacBoPhanCategoryController';
import { CacBoPhanCategoryService, CacBoPhanCategoryServiceImpl } from './service/CacBoPhanCategoryService';
import { CacBoPhanCategoryRepository, CacBoPhanCategoryRepositoryImpl } from './repository/CacBoPhanCategoryRepository';

const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(MedicalRegistrationController);
container.bind<RegistrableController>(TYPES.Controller).to(CacBoPhanCategoryController);
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
container.bind<RegistrableController>(TYPES.Controller).to(DoctorController);
container.bind<RegistrableController>(TYPES.Controller).to(ReasonCategoryController);
container.bind<RegistrableController>(TYPES.Controller).to(IcdCategoryController);
container.bind<RegistrableController>(TYPES.Controller).to(XutriCategoryController);
container.bind<RegistrableController>(TYPES.Controller).to(TiencanCategoryController);
container.bind<RegistrableController>(TYPES.Controller).to(TongquatCategoryController);
container.bind<RegistrableController>(TYPES.Controller).to(TrieuchungCategoryController);
container.bind<RegistrableController>(TYPES.Controller).to(DiseaseCategoryController);



container.bind<RegistrationRepository>(TYPES.RegistrationRepository).to(RegistrationRepositoryImpl);
container.bind<MedicalRegistrationService>(TYPES.MedicalRegistrationService).to(MedicalRegistrationServiceImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);


//category section
container.bind<CategoryRepository>(TYPES.CategoryRepository).to(CategoryRepositoryImpl);
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryServiceImpl);

//category section
container.bind<ReasonCategoryRepository>(TYPES.ReasonCategoryRepository).to(ReasonCategoryRepositoryImpl);
container.bind<ReasonCategoryService>(TYPES.ReasonCategoryService).to(ReasonCategoryServiceImpl);

//category section
container.bind<IcdCategoryService>(TYPES.IcdCategoryService).to(IcdCategoryServiceImpl);
container.bind<IcdCategoryRepository>(TYPES.IcdCategoryRepository).to(IcdCategoryRepositoryImpl);

//category section
container.bind<TrieuchungCategoryService>(TYPES.TrieuchungCategoryService).to(TrieuchungCategoryServiceImpl);
container.bind<TrieuchungCategoryRepository>(TYPES.TrieuchungCategoryRepository).to(TrieuchungCategoryRepositoryImpl);

//category section
container.bind<TiencanCategoryRepository>(TYPES.TiencanCategoryRepository).to(TiencanCategoryRepositoryImpl);
container.bind<TiencanCategoryService>(TYPES.TiencanCategoryService).to(TiencanCategoryServiceImpl);

//category section
container.bind<DiseaseCategoryService>(TYPES.DiseaseCategoryService).to(DiseaseCategoryServiceImpl);
container.bind<DiseaseCategoryRepository>(TYPES.DiseaseCategoryRepository).to(DiseaseCategoryRepositoryImpl);

//category section
container.bind<XutriCategoryService>(TYPES.XutriCategoryService).to(DiseaseCategoryServiceImpl);
container.bind<XutriCategoryRepository>(TYPES.XutriCategoryRepository).to(XutriCategoryRepositoryImpl);

//category section
container.bind<CacBoPhanCategoryService>(TYPES.CacBoPhanCategoryService).to(CacBoPhanCategoryServiceImpl);
container.bind<CacBoPhanCategoryRepository>(TYPES.CacBoPhanCategoryRepository).to(CacBoPhanCategoryRepositoryImpl);

//category section
container.bind<TongquatCategoryService>(TYPES.TongquatCategoryService).to(TongquatCategoryServiceImpl);
container.bind<TongquatCategoryRepository>(TYPES.TongquatCategoryRepository).to(TongquatCategoryRepositoryImpl);

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

//counter 
container.bind<CounterRepository>(TYPES.CounterRepository).to(CounterRepositoryImpl)


// utils section
container.bind<ResponseUtil>(TYPES.ResponseUtil).to(ResponseUtilImp);

// sync service
container.bind<SyncService>(TYPES.SyncService).to(SyncServiceImpl);

export default container;
