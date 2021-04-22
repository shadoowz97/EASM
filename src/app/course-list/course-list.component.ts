/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-15 21:10:21
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-18 22:19:54
 */
import {
  Component,
  OnDestroy,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';
import { Category } from '../dataDef/Category';
import { Course } from '../dataDef/Course';
import { CourseService } from '../service/course-service/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  private categories: Category[] = [];
  private subscriptions: Subscription[] = [];
  colConfig = [
    {
      name: '课程ID',
      size: '100px',
    },
    {
      name: '课程名称',
      size: '100px',
    },
    {
      name: '课程分类号',
      size: '50px',
    },
    {
      name: '状态',
      size: '50px',
      filterMultiple: true,
      listOfFilter: [
        {
          text: '使用',
          value: 'active',
          byDefault: true,
        },
        {
          text: '废弃',
          value: 'deprecated',
        },
      ],
      filterFn: (list: string[], d: Course) =>
        list.some((value) => d.state.indexOf(value) !== -1),
    },
    {
      name: '删除',
      size: '50px',
    },
    {
      name: '管理',
      size: '50px',
    },
    {
      name: '弃用',
      size: '50px',
    },
  ];
  constructor(private courseService: CourseService) {
    this.subscriptions.push(
      this.courseService.getCategories().subscribe({
        next: (cs) => {
          this.categories = cs;
          this.colConfig[2] = {
            name: '分类',
            size: '50px',
            filterMultiple: true,
            listOfFilter: cs.map((e: Category) => {
              return {
                value: e.categoryId,
                text: e.categoryId,
                byDefault: true,
              };
            }),
            filterFn: (list: string[], course: Course) =>
              list.some((value) => value.indexOf(course.categoryId) !== -1),
          };
          this.colConfig = [].concat(this.colConfig);
        },
      })
    );
    this.subscriptions.push(
      this.courseService.getCourses().subscribe({
        next: (cs) => (this.courses = cs),
      })
    );
  }
  deleteCourse(id: String) {
    this.courseService.deleteCourse(id);
  }
  deprecatedCourse(id: String) {
    this.courseService.deprecatedCourse(id);
  }

  toDetail(id: String) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  ngOnInit() {}
}
