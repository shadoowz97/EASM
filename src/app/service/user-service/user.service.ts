/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-16 18:04:16
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-02 10:22:17
 */
import { Injectable } from '@angular/core';
import { base_url } from '../../config/config';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResSet } from 'src/app/dataDef/ResSet';
import { UserLogInModel } from 'src/app/dataDef/UserLogInModel';
import { Md5 } from 'ts-md5';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { async } from 'rxjs/internal/scheduler/async';
import { ValidationErrors } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userModel: UserLogInModel = new UserLogInModel();
  constructor(private http: HttpClient) {}

  doLogin(): Observable<any> {
    let param = new HttpParams()
      .set('username', this.userModel.userId)
      .set('password', this.userModel.password);
    return this.http.post<any>(base_url + '/api/doLogin', param, {
      observe: 'body',
    });
  }
  public logOut(userId, token) {}
  public accessUserModel(): UserLogInModel {
    return this.userModel;
  }
  public isUsrIdUnique(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.http
        .get('/api/usr/isUsrIdUnique/' + control.value, {
          observe: 'body',
        })
        .toPromise()
        .then((res: ResSet) => {
          if (res.stateCode == 200) return null;
          else {
            return {
              valid: false,
              required: true,
            };
          }
        });
    };
  }
  public getUserName(): String {
    return this.userModel.username;
  }

  public async createEmployee(
    employeeName: string,
    employeeId: string,
    dutyId: string,
    title: string,
    departmentId: string,
    email: string
  ): Promise<Boolean> {
    var flag = false;
    await this.http
      .post(
        '/api/usr/employee/register',
        {
          employeeName: employeeName,
          employeeId: employeeId,
          dutyId: dutyId,
          title: title,
          departmentId: departmentId,
          email: email,
        },
        { observe: 'body' }
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          flag = true;
        } else {
          flag = false;
        }
      })
      .catch((e) => {
        flag = false;
      });
    return flag;
  }
}
