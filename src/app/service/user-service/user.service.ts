/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-16 18:04:16
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-25 03:36:59
 */
import { Injectable } from '@angular/core';
import { base_url } from '../../config/config';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { ResSet } from 'src/app/dataDef/ResSet';
import { UserLogInModel } from 'src/app/dataDef/UserLogInModel';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { StudentProfileModel } from 'src/app/dataDef/StudentProfileModel';
import { NzMessageService } from 'ng-zorro-antd';
import { BaseEmployee } from 'src/app/dataDef/BaseEmployee';
import { TabService } from 'src/app/tab.service';
import { Role } from 'src/app/dataDef/Role';
import { Md5 } from 'ts-md5';
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
  private userModelObserver: Observer<UserLogInModel>[] = [];
  private userModelObserverable: Observable<UserLogInModel> = new Observable<UserLogInModel>(
    (observer: Observer<UserLogInModel>) => {
      console.log("订阅用户")
      observer.next(this.userModel);
      this.userModelObserver.push(observer);
    }
  );

  public subscribeUser(): Observable<UserLogInModel> {
    return this.userModelObserverable;
  }
  private roles: Role[];
  private userModel: UserLogInModel = new UserLogInModel();
  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private tabService: TabService
  ) {}
  public canGrantRoles(): Role[] {
    if (this.userModel.authorization == null) {
      return [];
    }
    return this.userModel.authorization;
  }
  public roleSignal(roleId: number): string {
    return 'user';
  }

  public roleColor(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'purple';
      case 2:
        return 'cyan';
      case 3:
        return 'gold';
      case 4:
        return 'geekblue';
      case 5:
        return 'orange';
    }
  }
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
  public serverMentoringRelationship(
    studentId: string,
    supervisorId: string
  ): Promise<Boolean | null> {
    return this.http
      .delete(
        '/api/usr/server/MentoringRelationship/' +
          studentId +
          '/' +
          supervisorId,
        {
          observe: 'body',
        }
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode === 200) {
          this.msg.success('解除成功');
          return Promise.resolve(true);
        } else {
          this.msg.error(res.message);
          return Promise.resolve(false);
        }
      })
      .catch(() => {
        this.msg.error('网络错误');
        return Promise.resolve(false);
      });
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
      if (role.name == roleName) {
        return true;
      }
    }
    return false;
  }

  public hasAnyRole(roleNames: string[]): boolean {
    for (const roleName of roleNames) {
      if (this.hasRole(roleName)) {
        return true;
      }
    }
    return false;
  }

  public hasAllRoles(roleNames: string[]): boolean {
    for (const roleName of roleNames) {
      if (!this.hasRole(roleName)) {
        return false;
      }
    }
    return true;
  }
  doLogin(): Observable<any> {
    console.log(Md5.hashStr(this.userModel.password));
    let param = new HttpParams()
      .set('username', this.userModel.userId)
      .set(
        'password',
        Md5.hashStr(this.userModel.password + 'hjusefg').toString()
      );
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
          if (res.stateCode == 200) {
            return null;
          } else {
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
  public changeUserState(state: number):void {
    const tempuserModel = new UserLogInModel();
    tempuserModel.userState = state;
    tempuserModel.authorization = this.userModel.authorization;
    tempuserModel.roles = this.userModel.roles;
    tempuserModel.username = this.userModel.username;
    this.userModel = tempuserModel;
    this.userModelObserver.forEach((o) => {
      o.next(this.userModel);
    });
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

  public grantRolesToUsr(
    rolesId: number[],
    usrId: string
  ): Promise<Boolean | null> {
    return this.http
      .post(
        '/api/usr/roles/grant',
        {
          roles: rolesId,
          usrId: usrId,
        },
        {
          observe: 'body',
        }
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode) {
          this.msg.success('授权成功');
          return Promise.resolve(true);
        } else {
          this.msg.error(res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('网络错误');
        return Promise.resolve(false);
      });
  }

  public revokeRole(rid: number, usrId: string): Promise<Boolean> {
    return this.http
      .delete('/api/usr/roles/revoke/' + rid + '/' + usrId, {
        observe: 'body',
      })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('收回成功');
          return Promise.resolve(true);
        } else {
          this.msg.error(res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('网络错误');
        return Promise.resolve(false);
      });
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

  public queryUserWaitToPush(): Promise<any> {
    return this.http
      .get('/api/usr/employee/queryWaitToPush')
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(res.data);
        } else {
          this.msg.error('查询失败');
          return Promise.resolve([]);
        }
      })
      .catch((e) => {
        console.log(e);
        this.msg.error('查询失败');
        return Promise.resolve([]);
      });
  }

  public deleteEmployee(employeeId: string): Promise<boolean> {
    return this.http
      .delete('/api/usr/employee/delete/{id}')
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('删除成功');
          return Promise.resolve(true);
        } else {
          this.msg.error('删除失败');
          return Promise.resolve(false);
        }
      });
  }
}
