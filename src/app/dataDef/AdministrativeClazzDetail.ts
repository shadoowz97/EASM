/*
 * @Descripttion: 
 * @version: 
 * @Author: Shadoowz
 * @Date: 2020-12-16 16:56:00
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-16 16:57:18
 */
import { AdministrativeClazz } from './AdministrativeClazz';
import { BaseStudent } from './base-student';
export interface AdministrativeClazzDetail extends AdministrativeClazz {
  students: BaseStudent[];
}
