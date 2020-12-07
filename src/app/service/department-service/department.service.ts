/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-08-08 09:52:35
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-06 16:08:14
 */

import { Injectable, resolveForwardRef } from '@angular/core';
import { ResSet } from 'src/app/dataDef/ResSet';
import { DepartmentInfo } from 'src/app/dataDef/DepartmentInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Duty } from 'src/app/dataDef/Duty';
import { NzMessageService } from 'ng-zorro-antd';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ElementSchemaRegistry } from '@angular/compiler';
import { TabService } from 'src/app/tab.service';
import { ResolveEnd } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private departmentList: DepartmentInfo[] = [];
  private titles: string[] = [];
  private duties: Duty[] = [];
  private hasLoadDepartmentList: boolean = false;
  private hasLoadDuty: boolean = false;
  private hasLoadTitle: boolean = false;
  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private tabService: TabService
  ) {}
  /**
   * @author: Shadoowz
   * @Date: 2020-12-01 08:40:01
   * @param {*}
   * @return 当前的部门列表
   * @description: 获取部门信息，如果尚未加载过，则从服务端同步获取数据
   */
  public async getDepartmentList() {
    if (!this.hasLoadDepartmentList) await this.loadDepartment();
    console.log('load over!' + this.departmentList);
    return this.departmentList;
  }

  public checkDepartmentUnique(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.http
        .get('/api/department/idUnique/' + control.value, { observe: 'body' })
        .toPromise()
        .then((res: ResSet) => {
          if (res.stateCode == 200) return null;
          else
            return {
              required: false,
              valid: true,
            };
        });
    };
  }
  /**
   * @author: Shadoowz
   * @Date: 2020-12-01 17:02:22
   * @param {*}
   * @return {*}
   * @description: 同步获取department的列表
   */
  public async loadDepartment() {
    this.departmentList = [];
    await this.http
      .get('/api/department/queryAllDepartment')
      .toPromise()
      .then((res: ResSet) => {
        console.log('get allDepartment');
        if (res.stateCode == 200) {
          this.departmentList = res.data;
          this.hasLoadDepartmentList = true;
          console.log(JSON.stringify(this.departmentList));
        } else {
          this.msg.error('拉取部门列表失败');
        }
      });
  }
  /**
   * @author: Shadoowz
   * @Date: 2020-12-01 17:04:52
   * @param {*}
   * @return {*}
   * @description:获取
   */
  public async getDuties(): Promise<Duty[] | null> {
    if (!this.hasLoadDuty) await this.loadDuties();
    return this.duties;
  }
  public async loadDuties() {
    await this.http
      .get('/api/department/duties')
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.duties = res.data;
          this.hasLoadDuty = true;
        } else {
          this.msg.error('拉取失败');
        }
      });
  }
  /**
   * @author: Shadoowz
   * @Date: 2020-12-01 15:45:13
   * @param departmentId 部门唯一标识符
   * @param departmentName 部门名称
   * @param description 部门描述
   * @return {*}
   * @description: 创建新部门，会同步刷新service中的department
   * 缓存
   */
  public async createDepartment(
    departmentId: string,
    departmentName: string,
    description: string
  ): Promise<boolean | null> {
    var headers = new HttpHeaders()
      .set('departmentId', departmentId)
      .set('departmentName', departmentName)
      .set('description', description);
    var res = await this.http
      .post(
        '/api/department/create',
        {
          departmentId: departmentId,
          departmentName: departmentName,
          departmentDescription: description,
          departmentState: 'active',
        },
        { observe: 'body' }
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('创建成功');
          this.loadDepartment();
          return true;
        } else {
          this.msg.error(res.message);
          return Promise.resolve(false);
        }
      });
    return res;
  }
  public async getTitle(): Promise<string[] | null> {
    if (!this.hasLoadTitle) await this.loadTitle();
    return this.titles;
  }
  /**
   * @author: Shadoowz
   * @Date: 2020-12-01 21:54:31
   * @param {*}
   * @return {*}
   * @description:
   */
  public async loadTitle() {
    await this.http
      .get('/api/department/titles')
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.titles = res.data;
          this.hasLoadDuty = true;
        }
      });
  }

  public toDetail(id: string) {
    let params = [id];
    this.tabService.addTab(
      'department' + id,
      'departmentDetail',
      '部门详情'+id,
      params,
      false
    );
  }

  public async departmentDetail(id: string): Promise<ResSet | null> {
    var res = await this.http
      .get('/api/department/detail/' + id, { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        return Promise.resolve(res);
      })
      .catch((e) => {
        return Promise.resolve(null);
      });

    return res;
  }
}
