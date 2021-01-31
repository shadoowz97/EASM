/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-01-29 20:34:18
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-29 20:38:13
 */
import { StudentProfileModel } from '../dataDef/StudentProfileModel';
import { StudentSupervisorRelation } from '../dataDef/StudentSupervisorRelation';
export class StudentDetail {
  studentProfile: StudentProfileModel;
  mentoringRelationship: StudentSupervisorRelation[];
}
