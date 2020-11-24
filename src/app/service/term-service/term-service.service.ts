/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-08-05 17:47:44
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-11-19 10:33:47
 */
import { Injectable } from '@angular/core';
import { TermBasicInfo } from '../../dataDef/TermBasicInfo';
import { ResSet } from 'src/app/dataDef/ResSet';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { async } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TermService {
  constructor(private http: HttpClient) {}
  async createTerm(term: TermBasicInfo): Promise<boolean> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const res: any = await this.http
      .post('/api/term/createNewTerm/', JSON.stringify(term), {
        observe: 'body',
        headers: header,
      })
      .toPromise();
    if (res.stateCode == 200) return true;
    else return false;
  }
  termIdUniqueChick(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.http
        .get('/api/term/checkTermIdUnique/' + control.value, {
          observe: 'body',
        })
        .toPromise()
        .then((res: ResSet) => {
          if (res.data) {
            return null;
          } else
            return Promise.resolve({
              vaild: false,
              required: true,
            });
        });
    };
  }

  termNameUniqueCeck(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.http
        .get('/api/term/checkTermNameUnique/' + control.value, {
          observe: 'body',
        })
        .toPromise()
        .then((res: ResSet) => {
          if (res.data) {
            return null;
          } else
            return Promise.resolve({
              vaild: false,
              required: true,
            });
        });
    };
  }
  async searchTermsById(id: string): Promise<any> {
    let res = await this.http
      .get('/api/term/queryTermById/' + id, { observe: 'body' })
      .toPromise();
    return res;
  }
  async searchTermsByName(name: string): Promise<any> {
    let res = await this.http
      .get('/api/term/queryTermByName/' + name, {
        observe: 'body',
      })
      .toPromise();
    return res;
  }
  async deleteTermByName(name: string): Promise<any> {
    let res = await this.http
      .get('/api/term/deleteTermByName/' + name, { observe: 'body' })
      .toPromise();
    return res;
  }

  async deleteTermById(id: string): Promise<any> {
    let res = await this.http
      .get('/api/term/deleteTermById/' + id, {
        observe: 'body',
      })
      .toPromise();
    return res;
  }
}
