/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-16 18:04:16
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-28 00:30:47
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
import { StudentProfileModel } from 'src/app/dataDef/StudentProfileModel';
import { ResolveEnd } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { BaseEmployee } from 'src/app/dataDef/BaseEmployee';
import { TabService } from 'src/app/tab.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private studentState: string[] = [
    '在读',
    '休学',
    '毕业',
    '延期',
    '肄业',
    '待入学',
  ];
  private userModel: UserLogInModel = new UserLogInModel();
  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private tabService: TabService
  ) {}
  public colorMap(state: string): string {
    switch (state) {
      case '待入学':
        return 'cyan';
      case '在读':
        return 'green';
      case '休学':
        return 'magenta';
      case '毕业':
        return 'geekblue';
      case '延期':
        return 'orange';
      case '肄业':
        return 'red';
      default:
        return '';
    }
  }
  public getAllStudentState(): string[] {
    return this.studentState;
  }
  public editStudentState(
    studentId: string,
    state: string
  ): Promise<Boolean | null> {
    return this.http
      .put(
        '/api/usr/student/modify/state/' + studentId + '/' + state,
        {},
        { observe: 'body' }
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        return Promise.resolve(false);
      });
  }
  public hasRole(roleName: string): boolean {
    for (let role of this.userModel.roles) {
      if (role.name == roleName) return true;
    }
    return false;
  }
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
  public async createStudent(
    student: StudentProfileModel
  ): Promise<boolean | null> {
    var result = this.http
      .post('/api/usr/student/register', student, {
        observe: 'body',
      })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(true);
        } else {
          this.msg.error('内部错误');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        console.log(e);
        this.msg.error('网络错误');
        return Promise.resolve(false);
      });
    return result;
  }
  /**
   * @author: Shadoowz
   * @Date: 2021-01-24 11:15:10
   * @param {*}
   * @return {*}
   * @description:
   */
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

  public async employeeDetail(employeeId: string): Promise<BaseEmployee> {
    var res = await this.http
      .get('/api/usr/employee/detail/' + employeeId, { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(res.data);
        } else {
          this.msg.error('请求失败');
          return Promise.resolve(null);
        }
      })
      .catch((e) => {
        console.log(e);
        this.msg.error('网络错误');
        return Promise.resolve(null);
      });
    return res;
  }

  public toEmployeeDetail(employeeId: string): void {
    this.tabService.addTab(
      'employee' + employeeId,
      '/employeeDetail',
      '教职工详情 : ' + employeeId,
      [employeeId],
      false
    );
  }

  public async changeEmployeeIntroduction(
    employeeId: string,
    introdution: string
  ): Promise<Boolean> {
    var res = await this.http
      .post(
        '/api/usr/employee/modify/introduction/',
        {
          employeeId: employeeId,
          introduction: introdution,
        },
        {
          observe: 'body',
        }
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('保存成功！');
          return Promise.resolve(true);
        } else {
          this.msg.error(res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        console.log(e);
        this.msg.error('网络错误');
        return Promise.resolve(false);
      });
    return res;
  }
}
