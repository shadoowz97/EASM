/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-20 10:45:50
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-21 21:02:37
 */
export interface CertificationCourse {
  categoryId: string;
  courseId: string;
  courseName: string;
  classHour: number;
  position: string;
  startDate: number;
  endDate: number;
  description: string;
  state: string;
  createTime: number;
}
