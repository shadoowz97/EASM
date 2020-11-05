import { Injectable } from '@angular/core';
import { AdministrativeClazz } from '../../dataDef/AdministrativeClazz';
@Injectable({
  providedIn: 'root',
})
export class AdministrativeClazzService {
  constructor() {}
  adClazzList: AdministrativeClazz[] = [
    {
      clazzId: '201901adc',
      clazzName: 'ISTIC2019',
      rGrade: '2019',
      status: 'active',
    },
  ];
  addClazz(adClazz: AdministrativeClazz) {
    this.adClazzList.push(adClazz);
  }

  getAdministrativeClazzList(): AdministrativeClazz[] {
    return this.adClazzList;
  }
  
}
