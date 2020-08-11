import { Injectable } from '@angular/core';
import { ResSet } from 'src/app/dataDef/ResSet';
import { DepartmentInfo } from 'src/app/dataDef/DepartmentInfo';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  /*
  模拟数据，应从后端请求且不保留本地cache
  */
  private departmentList: DepartmentInfo[] = [
    {
      departmentId: 'TCD',
      departmentName: '技术中心',
      departmentDescrption: '',
      status: 'active',
    },
    {
      departmentId: 'SD',
      departmentName: '战略中心',
      departmentDescrption: '',
      status: 'active',
    },
    {
      departmentDescrption: '',
      departmentName: '工程中心',
      departmentId: 'ED',
      status: 'active',
    },
    {
      departmentDescrption: '',
      departmentName: '方法中心',
      departmentId: 'MD',
      status: 'active',
    },
    {
      departmentDescrption: '',
      departmentName: '资源中心',
      departmentId: 'ED',
      status: 'active',
    },
    {
      departmentDescrption: '',
      departmentName: '评价中心',
      departmentId: 'EVD',
      status: 'active',
    },
  ];
  constructor() {}
  /*
  从后端请求查询ID是否是唯一的
  */
  hasDepartment(id: string): boolean {
    return false;
  }
  /**
   * 更改部门状态，部门状态应有active 和deprecated 可能的情况是
   * @param id
   * @param status
   */
  changeDepartmentStatus(id: string, status: string): ResSet {
    return {
      status: 200,
      message: 'change over',
      data: null,
      msf: null,
    };
  }
  createDepartment(
    departmentId: string,
    departmentName: string,
    description: string
  ): ResSet {
    this.departmentList = [
      ...this.departmentList,
      {
        departmentId,
        departmentName,
        departmentDescrption: description,
        status: 'active',
      },
    ];
    return {
      status: 200,
      message: 'successful',
      msf: null,
      data: this.departmentList,
    };
  }
  getDepartmentInfo(): ResSet {
    return {
      status: 200,
      data: this.departmentList,
      message: 'over',
      msf: null,
    };
  }
}
