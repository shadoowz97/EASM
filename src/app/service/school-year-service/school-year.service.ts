import { Injectable } from '@angular/core';
import { SchoolYear } from '../../dataDef/SchoolYear';
import { ResSet } from 'src/app/dataDef/ResSet';
import { ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { getLocaleDayPeriods } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ValidationErrors } from '@angular/forms';
import { async } from '@angular/core/testing';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class SchoolYearService {
  constructor(private http: HttpClient, private msgService: NzMessageService) {}
  async getSchoolYearList(): Promise<SchoolYear[]> {
    const res: any = await this.http
      .get('/api/schoolyear/queryAllSchoolYear')
      .toPromise();
    if (res.stateCode == 200) {
      return res.data.map((data) => {
        return {
          id: data.schoolYearId,
          name: data.schoolYearName,
          startDate: data.startDate,
          endDate: data.endDate,
          rGrade: '' + data.enterSchoolYear,
          state: data.schoolYearState,
        };
      });
    } else {
      this.msgService.error(res.message);
    }
  }
  checkSchoolYearNameUnique(schoolYearName): Observable<any> {
    return this.http.get(
      '/api/schoolyear/checkschoolyearname/' + schoolYearName,
      {
        observe: 'body',
      }
    );
  }
  checkSchoolYearIdUnique(schoolYearId: string): Observable<any> {
    console.log('get info');
    return this.http.get('/api/schoolyear/checkschoolyearid/' + schoolYearId, {
      observe: 'body',
    });
  }


  async addSchoolYear(schoolYear: SchoolYear): Promise<boolean> {
    let param = new HttpParams()
      .set('name', schoolYear.name)
      .set('id', schoolYear.id)
      .set('startDate', schoolYear.startDate.toString())
      .set('endDate', schoolYear.endDate.toString())
      .set('rGrade', schoolYear.rGrade);
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const res: any = await this.http
      .post('/api/schoolyear/createschoolyear', JSON.stringify(schoolYear), {
        headers: header,
        observe: 'body',
      })
      .toPromise();
    if (res.stateCode == 200) {
      this.msgService.success('创建成功');
      return true;
    } else {
      this.msgService.error(res.message);
      return false;
    }
  }


}
