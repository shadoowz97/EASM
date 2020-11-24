/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-08-05 21:54:15
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-11-19 10:36:06
 */
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  AbstractControl,
  FormGroup,
  FormControlName,
  Validators,
} from '@angular/forms';
import { TermService } from '../service/term-service/term-service.service';
import { TermBasicInfo } from '../dataDef/TermBasicInfo';
import { ResSet } from '../dataDef/ResSet';
import { TabService } from '../tab.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-query-term',
  templateUrl: './query-term.component.html',
  styleUrls: ['./query-term.component.css'],
})
export class QueryTermComponent implements OnInit {
  searchTermForm: FormGroup;
  termIdControl: AbstractControl;
  termNameControl: AbstractControl;
  termList: TermBasicInfo[];
  columnConfig = [
    {
      title: '学期名称',
      size: '100px',
    },
    {
      title: '学期ID',
      size: '100px',
    },
    {
      title: '开始日期',
      size: '100px',
      compare: (a: TermBasicInfo, b: TermBasicInfo) =>
        a.startTime - b.startTime,
    },
    {
      title: '结束日期',
      size: '100px',
      compare: (a: TermBasicInfo, b: TermBasicInfo) => a.endTime - b.endTime,
    },
    {
      title: '学期状态',
      size: '50px',
      filterMultiple: true,
      listOfFilter: [
        { text: 'init', value: 'init', byDefault: true },
        { text: 'ready', value: 'ready', byDefault: true },
        { text: 'start', value: 'start', byDefault: true },
        { text: 'ongoing', value: 'ongoing', byDefault: true },
        { text: 'end', value: 'end', byDefault: true },
        { text: 'destory', value: 'destory', byDefault: true },
      ],
      filterFn: (value: string[], item: TermBasicInfo) =>
        value.some((status) => status.indexOf(item.status) !== -1),
    },
    {
      title: '管理学期',
      size: '50px',
    },
    {
      title: '删除学期',
      size: '50px',
    },
  ];
  constructor(
    private termService: TermService,
    private tabService: TabService,
    private msgService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initial();
  }

  private initial() {
    this.searchTermForm = new FormGroup({
      termIdControl: new FormControl('', [
        Validators.nullValidator,
        Validators.required,
      ]),
      termNameControl: new FormControl('', [
        Validators.nullValidator,
        Validators.required,
      ]),
    });
    this.termIdControl = this.searchTermForm.controls['termIdControl'];
    this.termNameControl = this.searchTermForm.controls['termNameControl'];
  }
  searchByTermID(): void {
    this.termService
      .searchTermsById(this.termIdControl.value)
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.termList = res.data.map((value) => {
            return {
              termId: value.termID,
              termName: value.termName,
              startTime: value.startDate,
              endTime: value.endDate,
              schoolYearName: value.schoolYearName,
              status: value.termState,
            };
          });
        } else {
          this.msgService.error(res.message);
        }
      });
  }
  searchByTermName(): void {
    this.termService
      .searchTermsByName(this.termNameControl.value)
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.termList = res.data.map((value) => {
            return {
              termId: value.termID,
              termName: value.termName,
              startTime: value.startDate,
              endTime: value.endDate,
              schoolYearName: value.schoolYearName,
              status: value.termState,
            };
          });
        } else this.msgService.error(res.message);
      });
  }
  trackByTermId(_: number, item: any): any {
    return item.id;
  }
  deleteTerm(termName: string) {
    this.termService.deleteTermByName(termName).then((res: ResSet) => {
      if (res.stateCode == 200) {
        this.msgService.success('删除成功！');
        this.searchByTermID();
      } else {
        this.msgService.error('删除失败' + res.message);
      }
    });
  }

  toTermManagment(id: string): void {}
}
