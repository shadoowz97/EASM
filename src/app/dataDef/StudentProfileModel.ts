import { FamilyRelation } from './FamilyRelation';
import { PersonTrace } from './PersonTrace';
export class StudentProfileModel {
  constructor(){
    this.studentName=""
    this.studentId=""
    this.specility=""
    this.familyTel=""
  }
  //学生姓名
  studentName: string;
  //学号
  studentId: string;
  //出生年月日
  birthDay: string;
  //民族
  nation: string;
  //性别
  sex: string;
  //家庭详细住址
  familyAdress: string;
  //身份证号
  idNumber: string;
  //名字拼音
  pinyin: string;
  //行政班级
  administrativeClazz: string;
  //联系电话
  contactTel: string;
  //专业
  specility: string;
  //籍贯
  nativePlace: string;
  //宿舍号
  dorm: string;
  //所属中心
  department: string;
  //政治面貌
  pID: string;
  //电子邮箱
  email: string;
  //邮政编码
  postCode: string;
  //家庭电话
  familyTel: string;
  //家庭关系
  familyRelation: FamilyRelation[];
  //生活履历
  personTrace: PersonTrace[];
}
