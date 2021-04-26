/*
 * @Descripttion: 
 * @version: 
 * @Author: Shadoowz
 * @Date: 2021-04-23 16:03:11
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-23 16:09:35
 */
import { Certification } from './certification';
import { CertificationStudent } from './CertificationStudent';
export interface CertificationStudentDetail extends CertificationStudent {
  isticCertifications: Certification[];
}
