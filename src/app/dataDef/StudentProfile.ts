import { FamilyRelation } from './FamilyRelation';
import { PersonTrace } from './PersonTrace';
export interface StudentProfile {
  name: string;
  pinyin: string;
  birthday: number;
  department: string;
  speciality: string;
  nationality: string;
  studentId: string;
  dormitory: string;
  politicalIdentity: string;
  sex: string;
  id: string;
  email: string;
  clazz: string;
  tel: string;
  nativePlace: string;
  family: string;
  postcode: string;
  ftel: string;
  familyReletion: FamilyRelation[];
  personalTrace: PersonTrace[];
}
