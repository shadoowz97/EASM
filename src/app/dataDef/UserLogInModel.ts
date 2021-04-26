/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-09-28 10:16:39
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-25 03:18:00
 */
import { Role } from './Role';
export class UserLogInModel {
  constructor() {
    this.userState = 0;
  }
  username: string;
  userId: string;
  roles: Role[];
  password: string;
  userState: number=0;
  authorization: Role[];
}
