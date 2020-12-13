/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-08-09 17:01:21
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-12 10:43:58
 */
import { FamilyRelation } from './FamilyRelation';
import { PersonTrace } from './PersonTrace';
export class StudentProfileModel {
  constructor() {
    this.studentName = '';
    this.studentId = '';
    this.specialityId = '';
    this.familyTel = '';
    this.state = '在读';
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
  familyAddress: string;
  //身份证号
  idNumber: string;
  //名字拼音
  pinyin: string;
  //行政班级
  administrativeClazzId: string;
  //联系电话
  contactTel: string;
  //专业
  specialityId: string;
  //籍贯
  nativePlace: string;
  //宿舍号
  dorm: string;
  //学位类型
  degreeType: string;
  //入学年份
  enterYear: string;
  //所属中心
  departmentId: string;
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
  //学生状态
  state: string;
}
