/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-18 11:03:41
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-19 17:18:57
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CertificationCategory } from '../dataDef/CertificationCategory';
import { CertificationService } from '../service/certification-service/certification.service';

@Component({
  selector: 'app-certification-category-list',
  templateUrl: './certification-category-list.component.html',
  styleUrls: ['./certification-category-list.component.scss'],
})
export class CertificationCategoryListComponent implements OnInit, OnDestroy {
  certificationCategories: CertificationCategory[];
  private subscribtions: Subscription[] = [];
  spinningFlag: boolean = false;
  colConfig = [
    {
      name: '证书ID',
      size: '100px',
    },
    {
      name: '证书名称',
      size: '150px',
    },
    {
      name: '创建日期',
      size: '100px',
    },
    {
      name: '默认学时',
      size: '80px',
    },
    {
      name: '证书状态',
      size: '100px',
      filterMultiple: true,
      listOfFilter: [
        {
          text: '使用中',
          value: '使用中',
          byDefault: true,
        },
        {
          text: '废弃',
          value: '废弃',
        },
      ],
      filterFn: (list: string[], category: CertificationCategory) =>
        list.some((value) => category.state.indexOf(value) !== -1),
    },
    {
      name: '删除',
      size: '100px',
    },
    {
      name: '编辑',
      size: '100px',
    },
    {
      name: '更改状态',
    },
  ];
  constructor(private certificationCategoryService: CertificationService) {}

  public deleteCategory(categoryId: string): void {
    this.spinningFlag = true;
    this.certificationCategoryService
      .deleteCategory(categoryId)
      .then((res: Boolean) => {})
      .finally(() => {
        this.spinningFlag = false;
      });
  }
  public discardCategory(categoryId: string): void {
    this.spinningFlag = true;
    this.certificationCategoryService
      .discardCertificationCategory(categoryId)
      .then()
      .finally(() => {
        this.spinningFlag = false;
      });
  }

  public activeCategory(categoryId: string): void {
    this.spinningFlag = true;
    this.certificationCategoryService
      .activeCertificationCategory(categoryId)
      .then()
      .finally(() => {
        this.spinningFlag = false;
      });
  }
  ngOnDestroy(): void {
    this.subscribtions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  ngOnInit() {
    this.subscribtions.push(
      this.certificationCategoryService.getCertificationCategories().subscribe({
        next: (newCertificationCategories: CertificationCategory[]) => {
          this.certificationCategories = newCertificationCategories;
        },
      })
    );
  }
}
