/*
 * @Descripttion: 
 * @version: 
 * @Author: Shadoowz
 * @Date: 2021-01-28 09:20:53
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-30 00:14:55
 */
import { BaseStudent } from './base-student';
import { BaseEmployee } from './BaseEmployee';
export interface StudentSupervisorRelation {
  student: BaseStudent;
  supervisor: BaseEmployee;
  type: string;
}
