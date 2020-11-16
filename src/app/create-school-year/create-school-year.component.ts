import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormControl,
  Validators,
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { SchoolYearService } from '../service/school-year-service/school-year.service';

@Component({
  selector: 'app-create-school-year',
  templateUrl: './create-school-year.component.html',
  styleUrls: ['./create-school-year.component.css'],
})
export class CreateSchoolYearComponent implements OnInit {
  schoolYear: FormGroup;
  startDate: AbstractControl;
  endDate: AbstractControl;
  scId: AbstractControl;
  scName: AbstractControl;
  rGrade: AbstractControl;
  constructor(private syService: SchoolYearService) {}
  timeState = '';
  ngOnInit() {
    this.initial();
  }
  private initial() {
    this.schoolYear = new FormGroup({
      startDate: new FormControl('', []),
      endDate: new FormControl('', []),
      scId: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator],
        updateOn: 'blur',
      }),
      scName: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator],
        updateOn: 'blur',
      }),
      rGrade: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
    this.startDate = this.schoolYear.controls['startDate'];
    this.endDate = this.schoolYear.controls['endDate'];

    this.scId = this.schoolYear.controls['scId'];
    this.scName = this.schoolYear.controls['scName'];
    this.rGrade = this.schoolYear.controls['rGrade'];
    this.scId.setAsyncValidators(this.syIdUnique());
    this.scName.setAsyncValidators(this.syNameUnqiue());
    this.startDate.setValidators([
      Validators.required,
      Validators.nullValidator,
      this.dateCheck(),
    ]);
    this.endDate.setValidators([
      Validators.required,
      Validators.nullValidator,
      this.dateCheck(),
    ]);
  }
  dateNullCheck(): boolean {
    return this.startDate.value != null && this.endDate.value != null;
  }

  createSchoolYear(): void {
    if (
      this.syService.addSchoolYear({
        startDate: new Date(this.startDate.value).getTime(),
        endDate: new Date(this.endDate.value).getTime(),
        id: this.scId.value,
        name: this.scName.value,
        rGrade: this.rGrade.value,
        state:'准备中'
      })
    ) {
      this.schoolYear.reset();
    }
  }
  syIdUnique(): AsyncValidatorFn {
    return async (control): Promise<ValidationErrors | null> => {
      const value = control.value;
      return this.syService
        .checkSchoolYearIdUnique(value)
        .toPromise()
        .then((res: any) => {
          console.log(JSON.stringify(res));
          // tslint:disable-next-line: triple-equals
          if (res.data === true) {
            return null;
          } else {
            return Promise.resolve({
              vaild: false,
              required: true,
            });
          }
        });
    };
  }
  syNameUnqiue(): AsyncValidatorFn {
    return async (control): Promise<ValidationErrors | null> => {
      let value = control.value;
      return this.syService
        .checkSchoolYearNameUnique(value)
        .toPromise()
        .then((res: any) => {
          console.log(JSON.stringify(res));
          if (res.data) return null;
          return Promise.resolve({
            vaild: false,
            required: true,
          });
        });
    };
  }

  dateCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (this.endDate.dirty !== this.startDate.dirty) {
        this.timeState = 'warning';
        return { warning: true };
      }
      if (!this.startDate.dirty && !this.endDate.dirty) {
        return null;
      }
      const startDate = new Date(this.startDate.value).getTime();
      const endDate = new Date(this.endDate.value).getTime();
      if (endDate >= startDate && this.dateNullCheck()) {
        this.timeState = 'success';
        return { errorDate: '' };
      } else {
        this.timeState = 'error';
      }
      return null;
    };
  }
}
