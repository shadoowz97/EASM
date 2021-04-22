/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-21 21:31:28
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-22 10:35:54
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CertificationCourse } from '../dataDef/certification-course';
import { CertificationCategory } from '../dataDef/CertificationCategory';
import { CertificationService } from '../service/certification-service/certification.service';

@Component({
  selector: 'app-certification-course-list',
  templateUrl: './certification-course-list.component.html',
  styleUrls: ['./certification-course-list.component.css'],
})
export class CertificationCourseListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  categories: CertificationCategory[];
  spinningFlag: Boolean = false;
  certificationCourses: CertificationCourse[];
  timeGroup: FormGroup;
  categoriesMap = {};
  dateRangePickerControl: AbstractControl;
  colConfig = [
    {
      name: '课程ID',
      size: '100px',
    },
    {
      name: '课程名称',
      size: '150px',
    },
    {
      name: '课程分类',
      size: '150px',
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], course: CertificationCourse) =>
        list.some((value) => course.courseId.indexOf(value) !== -1),
    },
    {
      name: '课时',
      size: '50px',
    },
    {
      name: '状态',
      size: '70px',
      filterMultiple: true,
      listOfFilter: [
        {
          text: '正常',
          value: '正常',
          byDefault: true,
        },
        {
          text: '已结束',
          value: '已结束',
          byDefault: true,
        },
      ],
      filterFn: (list: string[], course: CertificationCourse) =>
        list.some((value) => course.state.indexOf(value) !== -1),
    },
    {
      name: '创建时间',
      size: '100px',
    },
    {
      name: '删除课程',
      size: '80px',
    },
    {
      name: '管理课程',
      size: '80px',
    },
  ];
  constructor(private certificationService: CertificationService) {
    this.initialFormGroup();
  }

  getLatestCertificationCourse(): void {
    this.spinningFlag = true;
    this.certificationService
      .queryLatestCertificationCourse()
      .then((res: CertificationCourse[]) => {
        if (res != null) this.certificationCourses = res;
        else this.certificationCourses = [];
      })
      .finally(() => {
        this.spinningFlag = false;
      });
  }

  private initialFormGroup(): void {
    this.timeGroup = new FormGroup({
      dateRangePicker: new FormControl([], {
        validators: [Validators.required, Validators.nullValidator],
      }),
    });
    this.dateRangePickerControl = this.timeGroup.controls['dateRangePicker'];
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  public getCategoryName(id: string): string {
    if (this.categories == null) return '';
    for (const c of this.categories) {
      if (id === c.id) return c.name;
    }
  }

  public queryCertificationCourseByTime(): void {
    this.spinningFlag = true;
    const stareDate = (this.dateRangePickerControl
      .value as Date[])[0].getTime();
    const endDate = (this.dateRangePickerControl.value as Date[])[1].getTime();
    this.certificationService
      .queryCertificationCourseByTime(stareDate, endDate)
      .then((courses: CertificationCourse[]) => {
        this.certificationCourses = courses;
      })
      .finally(() => {
        this.spinningFlag = false;
      });
  }
  public deleteCertificationCourse(id: string): void {
    this.spinningFlag = true;
    this.certificationService
      .deleteCertificationCourse(id)
      .then()
      .finally(() => {
        this.spinningFlag = false;
      });
  }
  ngOnInit() {
    this.subscriptions.push(
      this.certificationService.getCertificationCategories().subscribe({
        next: (certificationCategories: CertificationCategory[]) => {
          this.categories = certificationCategories;
          if (this.categories != null) {
            this.categoriesMap = {};
            for (const c of this.categories) {
              this.categoriesMap[c.id] = c.name;
            }
            this.colConfig[2] = {
              name: '证书分类',
              size: '150px',
              filterMultiple: true,
              listOfFilter: certificationCategories.map(
                (c: CertificationCategory) => {
                  return {
                    text: c.name,
                    value: c.id,
                    byDefault: true,
                  };
                }
              ),
              filterFn: (list: string[], course: CertificationCourse) =>
                list.some((value) => course.categoryId.indexOf(value) !== -1),
            };
            this.colConfig = [].concat(this.colConfig);
          }
        },
      })
    );
    this.subscriptions.push(
      this.certificationService.getLatestCertificationCourse().subscribe({
        next: (latestCertificationCourses: CertificationCourse[]) => {
          if (latestCertificationCourses != null) {
            this.certificationCourses = [].concat(latestCertificationCourses);
          }
        },
      })
    );
  }
}
