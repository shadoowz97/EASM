/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-22 21:20:06
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-23 02:47:43
 */
import { CertificationCourse } from './certification-course';
import { CertificationCourseStudentInfo } from './CertificationCourseStudentInfo';
export interface CertificationCourseDetail extends CertificationCourse {
  certificationCourseStudentInfo: CertificationCourseStudentInfo[];
}
