/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-16 16:19:43
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-16 22:19:11
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdministrativeClazzDetail } from '../dataDef/AdministrativeClazzDetail';
import { AdministrativeClazzService } from '../service/ad-clazz/administrative-clazz.service';

@Component({
  selector: 'app-adClazz-Detail',
  templateUrl: './adClazz-Detail.component.html',
  styleUrls: ['./adClazz-Detail.component.css'],
})
export class AdClazzDetailComponent implements OnInit, OnDestroy {
  id: String = null;
  spinningFlag = false;
  administrativeClazz: AdministrativeClazzDetail;
  private subscriptions: Subscription[] = [];
  constructor(
    private router: ActivatedRoute,
    private adClazzService: AdministrativeClazzService
  ) {
    this.spinningFlag = true;
    this.subscriptions.push(
      this.router.paramMap.subscribe((params) => {
        var id = params.get('id');
        if (this.id != id) {
          this.adClazzService
            .queryAdministrativeClazzDetail(id)
            .then((adclazz) => {
              this.administrativeClazz = adclazz;
            })
            .finally(() => {
              this.spinningFlag = false;
            });
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((e) => {
      e.unsubscribe();
    });
  }

  ngOnInit() {}
}
