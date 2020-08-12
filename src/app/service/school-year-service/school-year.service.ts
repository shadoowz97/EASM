import { Injectable } from '@angular/core';
import { SchoolYear } from '../../dataDef/SchoolYear';
import { ResSet } from 'src/app/dataDef/ResSet';
import { ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SchoolYearService {
  private schoolYearList: SchoolYear[] = [];
  constructor() {}

  getSchoolYear(): ResSet {
    return {
      status: 200,
      message: '',
      msf: null,
      data: this.schoolYearList,
    };
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
