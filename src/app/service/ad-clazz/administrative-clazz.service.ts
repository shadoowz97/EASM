/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-08-13 21:23:59
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-16 22:54:13
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ResSet } from 'src/app/dataDef/ResSet';
import { TabService } from 'src/app/tab.service';
import { AdministrativeClazz } from '../../dataDef/AdministrativeClazz';
import { AdministrativeClazzDetail } from '../../dataDef/AdministrativeClazzDetail';
@Injectable({
  providedIn: 'root',
})
export class AdministrativeClazzService {
  constructor(private http: HttpClient, private msg: NzMessageService,private tabService:TabService) {}
  adClazzList: AdministrativeClazz[];
  async addClazz(
    clazzName: string,
    clazzId: string,
    year: string
  ): Promise<boolean | null> {
    var res = await this.http
      .post('/api/ea/adclazz/create', {
        clazzId: clazzId,
        clazzName: clazzName,
        year: year,
      })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('创建成功');
          this.adClazzList = null;
          return Promise.resolve(true);
        } else {
          this.msg.error('创建失败');
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

  async getAdministrativeClazzList(): Promise<AdministrativeClazz[] | null> {
    if (this.adClazzList == null) await this.loadClazz();
    return this.adClazzList;
  }

  public async loadClazz() {
    await this.http
      .get('/api/ea/adclazz/queryall')
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) this.adClazzList = res.data;
      });
  }
  public toDetail(id:String){
    let params = [id];
    this.tabService.addTab(
      'adClass' + id,
      'adClassDetail',
      '班级详情:' + id,
      params,
      false
    );
  }
  public isClazzIdUnique(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.http
        .get('/api/ea/adclazz/idUnique/' + control.value, { observe: 'body' })
        .toPromise()
        .then((res: ResSet) => {
          if (res.stateCode == 200) {
            return null;
          } else {
            return { valid: true, required: false };
          }
        })
        .catch((e) => {
          return { valid: true, required: false };
        });
    };
  }

  public async deleteClazz(id: string): Promise<boolean | null> {
    var res = await this.http
      .delete('/api/ea/adclazz/delete/' + id, {
        observe: 'body',
      })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('删除成功');
          this.adClazzList = null;
          return Promise.resolve(true);
        } else {
          this.msg.error('删除失败');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        return Promise.resolve(false);
      });
    return res;
  }

  public async deprecateClazz(id: string): Promise<boolean | null> {
    var res = await this.http
      .delete('/api/ea/adclazz/graduate/' + id, {
        observe: 'body',
      })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('删除成功');
          this.adClazzList = null;
          return Promise.resolve(true);
        } else {
          this.msg.error('删除失败');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        return Promise.resolve(false);
      });
    return res;
  }

  public async queryAdministrativeClazzDetail(
    id: String
  ): Promise<AdministrativeClazzDetail | null> {
    var result = await this.http
      .get('/api/ea/adclazz/detail/' + id, { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(res.data);
        } else return Promise.resolve(null);
      }).catch(e=>{
        return Promise.resolve(null)
      });
    return result;
  }
}
