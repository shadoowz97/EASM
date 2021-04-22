/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-16 11:05:33
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-22 00:11:28
 */
import { ClassField } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CertificationCategory } from '../dataDef/CertificationCategory';
import { CertificationService } from '../service/certification-service/certification.service';
import { MyValidators } from '../util/MyVaildators';

@Component({
  selector: 'app-create-certification-course',
  templateUrl: './create-certification-course.component.html',
  styleUrls: ['./create-certification-course.component.scss'],
})
export class CreateCertificationCourseComponent implements OnInit, OnDestroy {
  certificationCourseFormGroup: FormGroup;
  courseIdControl: AbstractControl;
  courseNameControl: AbstractControl;
  categoryControl: AbstractControl;
  descriptionControl: AbstractControl;
  classHourControl: AbstractControl;
  positionControl: AbstractControl;
  dateRangePickerControl: AbstractControl;
  private subscribtions: Subscription[] = [];
  certificationCategories: CertificationCategory[];
  spinningFlag: boolean = false;
  constructor(private certificationService: CertificationService) {
    this.initial();
  }
  ngOnDestroy(): void {
    this.subscribtions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  private initial() {
    this.certificationCourseFormGroup = new FormGroup({
      courseId: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
        updateOn: 'blur',
      }),
      courseName: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
        updateOn: 'blur',
      }),
      category: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      dateRangePicker: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      classHour: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.nullValidator,
          Validators.min(2),
          Validators.max(100),
        ],
      }),
      description: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      position: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
    });
    this.categoryControl = this.certificationCourseFormGroup.controls[
      'category'
    ];
    this.courseIdControl = this.certificationCourseFormGroup.controls[
      'courseId'
    ];
    this.courseIdControl.setAsyncValidators(
      this.certificationService.isCategoryIdUnique()
    );
    this.dateRangePickerControl = this.certificationCourseFormGroup.controls[
      'dateRangePicker'
    ];
    this.courseNameControl = this.certificationCourseFormGroup.controls[
      'courseName'
    ];
    this.descriptionControl = this.certificationCourseFormGroup.controls[
      'description'
    ];
    this.positionControl = this.certificationCourseFormGroup.controls[
      'position'
    ];
    this.classHourControl = this.certificationCourseFormGroup.controls[
      'classHour'
    ];
  }

  ngOnInit() {
    this.subscribtions.push(
      this.certificationService.getCertificationCategories().subscribe({
        next: (categories: CertificationCategory[]) => {
          if (categories != null) {
            this.certificationCategories = categories.filter(
              (certificationCategory: CertificationCategory) => {
                return certificationCategory.state === '使用中';
              }
            );
          } else {
            this.certificationCategories = null;
          }
        },
      })
    );
  }

  public createCertificationCourse(): void {
    this.spinningFlag = true;
    this.certificationService
      .createCertificationCourse({
        categoryId: (this.categoryControl.value as CertificationCategory).id,
        courseId: this.courseIdControl.value as string,
        courseName: this.courseNameControl.value as string,
        classHour: this.classHourControl.value as number,
        description: this.descriptionControl.value as string,
        state: '正常',
        startDate: (this.dateRangePickerControl.value as Date[])[0].getTime(),
        endDate: (this.dateRangePickerControl.value as Date[])[1].getTime(),
        createTime: 0,
        position: this.positionControl.value as string,
      })
      .then((res: boolean) => {
        if (res) {
          this.certificationCourseFormGroup.reset();
        }
      })
      .finally(() => {
        this.spinningFlag = false;
      });
  }

  public onSelectCategory(currentCategory: CertificationCategory): void {
    if (currentCategory == null) {return;}
    this.classHourControl.setValue(currentCategory.classHour);
    this.descriptionControl.setValue(currentCategory.description);
  }
}
