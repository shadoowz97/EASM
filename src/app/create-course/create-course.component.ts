/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-19 22:02:15
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-16 13:01:07
 */
import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../service/course-service/course.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { MyValidators } from '../util/MyVaildators';
import { Category } from '../dataDef/Category';
import { Course } from '../dataDef/Course';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  courseId: AbstractControl;
  courseName: AbstractControl;
  courseCategory: String;
  courseBaseForm: FormGroup;
  description: AbstractControl;
  categories: Category[];
  subscribtions: Subscription[] = [];
  spiningFlag: boolean = false;
  constructor(private courseService: CourseService) {
    this.initial();
    this.subscribtions.push(
      this.courseService.getCategories().subscribe({
        next: (cs) => {
          this.categories = cs;
        },
      })
    );
  }
  private initial() {
    this.courseBaseForm = new FormGroup({
      courseId: new FormControl(null, {
        validators: [
          Validators.nullValidator,
          Validators.required
        ],
        updateOn: 'blur',
      }),
      courseName: new FormControl(null, [
        Validators.nullValidator,
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.nullValidator,
        Validators.required,
      ]),
    });
    this.courseId = this.courseBaseForm.controls['courseId'];
    this.courseId.setAsyncValidators(this.courseService.isCourseIdUnique());
    this.courseName = this.courseBaseForm.controls['courseName'];
    this.description = this.courseBaseForm.controls['description'];
  }

  createCourse(): void {
    this.spiningFlag = true;
    this.courseService
      .createCourse(
        <string>this.courseId.value,
        <string>this.courseCategory,
        <string>this.courseName.value,
        this.description.value
      )
      .then((res) => {
        if (res) {
          this.courseBaseForm.reset();
        }
      })
      .finally(() => {
        this.spiningFlag = false;
      });
  }
  ngOnInit(): void {}
}
