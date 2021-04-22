import { Component, OnInit ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import {
  AbstractControl,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { FormBuilder, FormGroup,FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { TermService } from '../service/term-service/term-service.service';
import { SchoolYearService } from '../service/school-year-service/school-year.service';
import { SchoolYear } from '../dataDef/SchoolYear';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-create-term',
  templateUrl: './create-term.component.html',
  styleUrls: ['./create-term.component.css'],
})
export class CreateTermComponent implements OnInit {
  newTermInfo: FormGroup;
  termIdControl: AbstractControl;
  termNameControl: AbstractControl;
  startDatePicker: AbstractControl;
  endDatePicker: AbstractControl;
  timeState: string;
  currentSchoolYear: SchoolYear = null;
  schoolYearControl: AbstractControl;
  schoolYearList: SchoolYear[];
  constructor(
    private termService: TermService,
    private schoolYearService: SchoolYearService,
    private msgService: NzMessageService
  ) {
    this.schoolYearService
      .getSchoolYearList()
      .then((res: SchoolYear[]) => (this.schoolYearList = res));
  }

  ngOnInit(): void {
    this.initial();
  }
  private initial() {
    this.newTermInfo = new FormGroup({
      termIdControl: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator],
        updateOn: 'blur',
      }),
      termNameControl: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator],
        updateOn: 'blur',
      }),
      startDatePicker: new FormControl('', []),
      endDatePicker: new FormControl('', []),
      schoolYearControl: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
    this.termIdControl = this.newTermInfo.controls['termIdControl'];
    this.termIdControl.setAsyncValidators(this.termService.termIdUniqueChick());
    this.termNameControl = this.newTermInfo.controls['termNameControl'];
    this.termNameControl.setAsyncValidators(
      this.termService.termNameUniqueCeck()
    );
    this.startDatePicker = this.newTermInfo.controls['startDatePicker'];
    this.endDatePicker = this.newTermInfo.controls['endDatePicker'];
    this.schoolYearControl = this.newTermInfo.controls['schoolYearControl'];
    this.startDatePicker.setValidators([Validators.required, this.dateCheck()]);
    this.endDatePicker.setValidators([Validators.required, this.dateCheck()]);
  }
  updateDatePicker(): void {
    this.endDatePicker.updateValueAndValidity();
    this.startDatePicker.updateValueAndValidity();
  }
  dateNullCheck(): boolean {
    return (
      this.startDatePicker.value != null && this.endDatePicker.value != null
    );
  }
  /**
   * @author: Shadoowz
   * @Date: 2020-11-19 09:09:11
   * @param {*}
   * @return {*}
   * @description:检测开始日期和结束日期，使得结束日期必须在开始日期之前
   */
  dateCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.startDatePicker.dirty !== this.endDatePicker.dirty) {
        this.timeState = 'warning';
        return { warning: true };
      }
      if (!this.startDatePicker.dirty && !this.endDatePicker.dirty) {
        return null;
      }
      let startDate = new Date(this.startDatePicker.value).getTime();
      let endDate = new Date(this.endDatePicker.value).getTime();
      if (endDate >= startDate && this.dateNullCheck()) {
        this.timeState = 'success';
        return { errorDate: '' };
      } else {
        this.timeState = 'error';
      }
      return null;
    };
  }
  /**
   * @author: Shadoowz
   * @Date: 2020-11-19 09:08:28
   * @param {*}
   * @return {*}
   * @description:创建新学期，若成功则重置表单
   */
  createTerm(): void {
    let res = this.termService.createTerm({
      termId: this.termIdControl.value,
      termName: this.termNameControl.value,
      endTime: new Date(this.endDatePicker.value).getTime(),
      startTime: new Date(this.startDatePicker.value).getTime(),
      status: 'init',
      schoolYearName: this.currentSchoolYear.name,
    });
    res.then((value: boolean) => {
      if (value) {
        this.msgService.success('创建成功');
        this.newTermInfo.reset();
      } else {
        this.msgService.error('创建失败');
      }
    });
  }

  /**
   * @author: Shadoowz
   * @Date: 2020-11-19 09:01:12
   * @param {Date} current
   * @return {*}
   * @description: 使非当前学期内的日期是不可选择的
   */
  checkDateTimeWithinSchoolYear = (current: Date) => {
    if (this.currentSchoolYear == null) {
      console.log('null');
      return true;
    } else {
      //console.log(this.currentSchoolYear.name);
      return (
        current.getTime() < this.currentSchoolYear.startDate ||
        current.getTime() > this.currentSchoolYear.endDate
      );
    }
  };
}
