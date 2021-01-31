/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-09-28 10:16:39
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-31 20:55:45
 */
import { Role } from './Role';
export class UserLogInModel {
  constructor() {
    this.userState = false;
  }
  username: string;
  userId: string;
  roles: Role[];
  password: string;
  userState: boolean;
  authorization: Role[];
}
