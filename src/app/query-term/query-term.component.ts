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
    },
    {
      title: '学期ID',
    },
    {
      title: '开始日期',
      compare: (a: TermBasicInfo, b: TermBasicInfo) =>
        a.startTime - b.startTime,
    },
    {
      title: '结束日期',
      compare: (a: TermBasicInfo, b: TermBasicInfo) => a.endTime - b.endTime,
    },
    {
      title: '学期状态',
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
      title: '',
    },
  ];
  constructor(
    private termService: TermService,
    private tabService: TabService
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
    const res: ResSet = this.termService.searchTermsByID(
      this.termNameControl.value
    );
    this.termList = res.data;
  }
  searchByTermName(): void {
    const res: ResSet = this.termService.searchTermsByName(
      this.termIdControl.value
    );
    this.termList = res.data;
  }
  trackByTermId(_: number, item: any): any {
    return item.id;
  }

  toTermManagment(id: string): void {}
}
