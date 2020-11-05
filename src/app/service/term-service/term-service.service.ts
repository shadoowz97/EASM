import { Injectable } from '@angular/core';
import { TermBasicInfo } from '../../dataDef/TermBasicInfo';
import { ResSet } from 'src/app/dataDef/ResSet';

@Injectable({
  providedIn: 'root',
})
export class TermService {
  constructor() {}
  private termList: TermBasicInfo[] = [
    {
      termId: '2020092002',
      termName: '2020年秋季学期',
      startTime: new Date('2019-09-01').getTime(),
      endTime: new Date('2020-01-22').getTime(),
      status: 'end',
    },
  ];
  createTerm(termName, termId, startTime, endTime): { [key: string]: any } {
    this.termList = [
      ...this.termList,
      {
        termId: termId,
        termName: termName,
        startTime: startTime,
        endTime: endTime,
        status: 'init',
      },
    ];

    return {
      status: 200,
      message: 'create Term Success',
      data: this.termList,
    };
  }

  searchTermsByID(id): ResSet {
    return {
      status: 200,
      message: '2 in total',
      data: this.termList,
      msf: null,
    };
  }

  searchTermsByName(name): ResSet {
    return {
      status: 200,
      message: 'get',
      data: this.termList,
      msf: null,
    };
  }
}
