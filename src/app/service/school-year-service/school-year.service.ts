import { Injectable } from '@angular/core';
import { SchoolYear } from '../../dataDef/SchoolYear';
import { ResSet } from 'src/app/dataDef/ResSet';
import { ValidatorFn } from '@angular/forms';
import { getLocaleDayPeriods } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SchoolYearService {
  private schoolYearList: SchoolYear[] = [{
    startDate:new Date("2019-08-12").getTime(),
    endDate:new Date("2020-08-01").getTime(),
    rGrade:'2019级',
    name:"2019-2020学年",
    id:"20192020scy"
  }];
  constructor() {}

  getSchoolYear(): ResSet {
    return {
      status: 200,
      message: '',
      msf: null,
      data: this.schoolYearList,
    };
  }

  getRGrade():ResSet{
    return {
      status:200,
      message:'msf',
      msf:null,
      data:this.schoolYearList.map(value=>value.rGrade)
    }
  }

  addSchoolYear(schoolYear: SchoolYear): boolean {
    this.schoolYearList.push(schoolYear);
    return true;
  }

  isUniqueId(scId: string): boolean {
    return true;
  }

  scIdUnique(): ValidatorFn {
    return (control): { [key: string]: any } => {
      if (this.isUniqueId(control.value)) return null;
      else {
        return { wrong: { value: control.value } };
      }
    };
  }
}
