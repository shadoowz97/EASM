/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-25 01:57:32
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-25 02:37:35
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CertificationStudent } from '../dataDef/CertificationStudent';
import { CertificationService } from '../service/certification-service/certification.service';
import { MyValidators } from '../util/MyVaildators';

@Component({
  selector: 'app-query-certification-student',
  templateUrl: './query-certification-student.component.html',
  styleUrls: ['./query-certification-student.component.scss'],
})
export class QueryCertificationStudentComponent implements OnInit {
  constructor(private certificationService: CertificationService) {}
  colConfig = [
    {
      name: '身份证号',
      size: '130px',
    },
    {
      name: '姓名',
      size: '100px',
    },
    {
      name: '性别',
      size: '70px',
    },
    {
      name: '所在机构',
      size: '150px',
    },
    {
      name: '联系方式',
      size: '100px',
    },
  ];
  ngOnInit() {
    this.prcIDGroup = new FormGroup({
      prcID: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
        MyValidators.PRCID(),
      ]),
    });
    this.affiliationGroup = new FormGroup({
      affiliation: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
  }
  certifcationStudents: CertificationStudent[];
  spinningFlag: boolean = false;
  prcIDGroup: FormGroup;
  affiliationGroup: FormGroup;
  public queryCertificationStudentByPRCID(): void {
    this.spinningFlag = true;
    this.certificationService
      .queryCertificationStudentByID(
        this.prcIDGroup.controls['prcID'].value as string
      )
      .then((cs: CertificationStudent) => {
        if (cs != null) {
          this.certifcationStudents = [cs];
        }
      })
      .catch((e) => {})
      .finally(() => {
        this.spinningFlag = false;
      });
  }

  public queryStudentByAffiliation(): void {
    this.spinningFlag = false;
    this.certificationService
      .queryCertificationStudentByAffiliation(
        this.affiliationGroup.controls['affiliation'].value as string
      )
      .then((css: CertificationStudent[]) => {
        this.certifcationStudents = css;
      })
      .catch((e) => {})
      .finally(() => {
        this.spinningFlag = false;
      });
  }

  toCertificationStudentDetail(id: string): void {
    this.certificationService.toCertificationStudentDetail(id);
  }
}
