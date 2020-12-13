/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-07 20:40:07
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-09 21:34:54
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ResSet } from 'src/app/dataDef/ResSet';
import { SpecialityInfo } from 'src/app/dataDef/SpecialityInfo';

@Injectable({
  providedIn: 'root',
})
export class EAService {
  private speciality: SpecialityInfo[];
  private degree: string[];
  constructor(private http: HttpClient, private msg: NzMessageService) {}
  public async getDegree(): Promise<string[] | null> {
    if (this.degree == null) await this.loadDegree();
    return this.degree;
  }
  public isSpecialityUnique(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.http
        .get('/api/ea/speciality/idUnique/' + control.value, {
          observe: 'body',
        })
        .toPromise()
        .then((res: ResSet) => {
          if (res.stateCode == 200) {
            return null;
          } else
            return {
              vaild: 'false',
            };
        });
    };
  }
  public async loadDegree() {
    await this.http
      .get('/api/ea/academicDegree/all')
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.degree = res.data;
        }
      });
  }
  public async getSpecialities(): Promise<SpecialityInfo[] | null> {
    if (this.speciality == null) await this.loadSpeciality();
    return this.speciality;
  }
  public async loadSpeciality() {
    await this.http
      .get('/api/ea/speciality/all', {
        observe: 'body',
      })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) this.speciality = res.data;
        else this.msg.error('拉取消息失败');
      });
  }

  public async createSpeciality(
    name: string,
    enName: string,
    specialityId: string,
    year: number
  ): Promise<boolean | null> {
    var res = await this.http
      .post(
        '/api/ea/speciality/create',
        {
          name: name,
          enName: enName,
          specialityId: specialityId,
          year: year,
        },
        { observe: 'body' }
      )
      .toPromise()
      .then((r: ResSet) => {
        if (r.stateCode == 200) {
          this.speciality=null;
          return Promise.resolve(true);
        } else this.msg.error('创建失败！');
        return Promise.resolve(false);
      })
      .catch((e) => {
        this.msg.error('网路错误');
        return Promise.resolve(false);
      });
    return res;
  }

  public async deprecateSpeciality(id: string): Promise<boolean | null> {
    var res = await this.http
      .delete('/api/ea/speciality/deprecate/' + id, { observe: 'body' })
      .toPromise()
      .then((r: ResSet) => {
        if (r.stateCode == 200) {
          this.speciality=null
          this.msg.success('废弃成功');
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      });
    return res;
  }

  public async deleteSpeciality(id: string): Promise<boolean | null> {
    var res = await this.http
      .delete('/api/ea/speciality/delete/' + id, { observe: 'body' })
      .toPromise()
      .then((r: ResSet) => {
        if (r.stateCode == 200) {
          this.speciality=null
          this.msg.success('删除成功');
          return Promise.resolve(true);
        } else {
          this.msg.error('删除失败');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('网络异常');
        return Promise.resolve(false);
      });
    return res;
  }
}
