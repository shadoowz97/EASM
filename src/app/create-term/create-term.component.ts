import { Component, OnInit } from '@angular/core';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import {
  AbstractControl,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { TermService } from '../service/term-service/term-service.service';
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
  constructor(private termService: TermService) {}

  ngOnInit(): void {
    this.initial();
  }
  private initial() {
    this.newTermInfo = new FormGroup({
      termIdControl: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
      termNameControl: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
      startDatePicker: new FormControl('', []),
      endDatePicker: new FormControl('', []),
    });
    this.termIdControl = this.newTermInfo.controls['termIdControl'];
    this.termNameControl = this.newTermInfo.controls['termNameControl'];
    this.startDatePicker = this.newTermInfo.controls['startDatePicker'];
    this.endDatePicker = this.newTermInfo.controls['endDatePicker'];
    this.startDatePicker.setValidators([Validators.required, this.dateCheck()]);
    this.endDatePicker.setValidators([Validators.required, this.dateCheck()]);
    this.termIdControl.reset();
    this.termNameControl.reset();
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
  createTerm(): void {
    let res: { [key: string]: any } = this.termService.createTerm(
      this.termNameControl.value,
      this.termIdControl.value,
      this.startDatePicker.value,
      this.endDatePicker.value
    );
    if (res.status == 200) {
      res.msf();
      this.initial();
    }
  }
}
