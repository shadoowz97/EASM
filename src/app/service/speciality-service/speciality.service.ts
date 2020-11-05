import { Injectable } from '@angular/core';
import { SpecialityInfo } from 'src/app/dataDef/SpecialityInfo';

@Injectable({
  providedIn: 'root',
})
export class SpecialityService {
  private specialityList: SpecialityInfo[] = [
    {
      name: '竞争情报',
      enName: 'CI',
      status: 'active',
      specialityId: 'CI',
      year: 2.5,
    },
    {
      name: '图书馆学',
      enName: 'LIB',
      status: 'active',
      specialityId: 'LIB',
      year: 2.5,
    },
    {
      name: '信息资源管理',
      enName: 'ISM',
      status: 'active',
      specialityId: 'ISM',
      year: 2.5,
    },
    {
      name: '情报学',
      enName: 'Info',
      status: 'active',
      specialityId: 'Info',
      year: 2.5,
    },
  ];
  constructor() {}
  addSpeciality(spInfo: SpecialityInfo){
    this.specialityList.push(spInfo);
  }

  getSpecialityList():any{
    return this.specialityList

  }
}
