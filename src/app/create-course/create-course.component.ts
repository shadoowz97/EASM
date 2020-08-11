import { Component, OnInit } from '@angular/core';
import { CourseBaseModel } from '../model/course-base-model';
import { CourseService } from '../service/course-service/course.service';
import {
  FormGroup,
  FormControl,
  FormControlName,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  courseId: AbstractControl;
  courseName: AbstractControl;
  courseCategory: AbstractControl;
  courseBaseForm: FormGroup;
  categoryName: String;

  constructor(private courseService: CourseService) {
   this.initial()
  }
  private initial() {
    this.courseBaseForm = new FormGroup({
      courseId: new FormControl(null, [
        Validators.nullValidator,
        Validators.required,
      ]),
      courseName: new FormControl(null, [
        Validators.nullValidator,
        Validators.required,
      ]),
      courseCategory: new FormControl(null, [
        Validators.nullValidator,
        Validators.required,
        this.hasCategory(),
      ]),
    });
    this.courseId = this.courseBaseForm.controls['courseId'];
    this.courseName = this.courseBaseForm.controls['courseName'];
    this.courseCategory = this.courseBaseForm.controls['courseCategory'];
    this.categoryName = '';
  }

  private hasCategory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let cg = this.courseService.getCategory(control.value);
      if (cg != null) {
        this.categoryName = cg.name;
        console.log('has cg');
        return null;
      }
      return { noCategory: { value: control.value } };
    };
  }
  createCourse(): void {
    this.courseService.createCourse(
      <string>this.courseId.value,
      <string>this.courseCategory.value,
      <string>this.courseName.value
    );
  }
  ngOnInit(): void {}
}
