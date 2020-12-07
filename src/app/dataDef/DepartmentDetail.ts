/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-03 21:33:13
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-03 21:45:01
 */
import { BaseEmployee } from './BaseEmployee';
import { DepartmentInfo } from './DepartmentInfo';
export interface DepartmentDetail extends DepartmentInfo {
  supervisor: BaseEmployee;
  sps: BaseEmployee[];
  others: BaseEmployee[];
}
