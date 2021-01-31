import { Role } from './Role';

/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-03 21:35:29
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-24 20:17:02
 */
export interface BaseEmployee {
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  departmentName: string;
  dutyName: string;
  title: string;
  introduction: string;
  roles: Role[];
}
