/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-15 21:10:45
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-16 09:43:06
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../dataDef/Category';
import { CourseService } from '../service/course-service/course.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  widthConfig = ['100px', '70px', '70px', '60px', '60px', '60px'];
  private subscriptions: Subscription[] = [];
  spinngFlag = false;
  colConfig = [
    {
      name: '分类名称',
    },
    {
      name: '分类ID',
      size: '130px',
    },
    {
      name: '状态',
      size: '130px',
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
      filterFn: (list: string[], d: Category) =>
        list.some((value) => d.state.indexOf(value) !== -1),
    },
    {
      name: '删除',
      size: '60px',
    },
    {
      name: '管理',
      size: '60px',
    },
    {
      name: '弃用',
      size: '60px',
    },
  ];
  constructor(private courseService: CourseService) {
    this.subscriptions.push(
      this.courseService.getCategories().subscribe({
        next: (cs) => {
          this.categories = cs;
          this.colConfig[1] = {
            name: '分类ID',
            size: '130px',
            filterMultiple: true,
            listOfFilter: cs.map((e: Category) => {
              return {
                value: e.categoryId,
                text: e.categoryId,
                byDefault: true,
              };
            }),
            filterFn: (list: string[], category: Category) =>
              list.some((value) => value.indexOf(category.categoryId) !== -1),
          };
          this.colConfig = [].concat(this.colConfig);
        },
      })
    );
  }
  deleteCategory(id: String) {
    this.spinngFlag = true;
    this.courseService
      .deleteCategory(id)
      .then((res) => {})
      .finally(() => {
        this.spinngFlag = false;
      });
  }
  deprecatedCategory(id: String) {
    this.spinngFlag = true;
    this.courseService.deprecatedCategory(id).finally(() => {
      this.spinngFlag = false;
    });
  }
  toDetail(id: String) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  ngOnInit() {}
}
