/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-22 21:09:34
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-24 21:59:24
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CertificationCourse } from '../dataDef/certification-course';
import { CertificationCategory } from '../dataDef/CertificationCategory';
import { CertificationService } from '../service/certification-service/certification.service';
import { CertificationCourseDetail } from '../dataDef/CertificationCourseDetail';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MyValidators } from '../util/MyVaildators';
import { async } from '@angular/core/testing';
import { CertificationStudent } from '../dataDef/CertificationStudent';
import { NzThMeasureDirective } from 'ng-zorro-antd';
import { CertificationCourseStudentInfo } from '../dataDef/CertificationCourseStudentInfo';
import { Md5 } from 'ts-md5';
import { ResSet } from '../dataDef/ResSet';

@Component({
  selector: 'app-certification-course-detail',
  templateUrl: './certification-course-detail.component.html',
  styleUrls: ['./certification-course-detail.component.scss'],
})
export class CertificationCourseDetailComponent implements OnInit {
  private subscribtions: Subscription[] = [];
  currentCourseId: string;
  categoriesMap = {};
  certificationCourseDetail: CertificationCourseDetail;
  spinningFlag: boolean = false;
  addStudentVisiable: Boolean = false;
  modalOkLoading: Boolean = false;
  studentFormGroup: FormGroup;
  colConfig = [
    {
      name: '身份证号',
      size: '130px',
    },
    {
      name: '姓名',
      size: '90px',
    },
    {
      name: '性别',
      size: '60px',
    },
    {
      name: '工作单位',
      size: '180px',
    },
    { name: '报名时间', size: '100px' },
    {
      name: '费用',
      size: '50px',
    },
    {
      name: '上传/下载',
      size: '100px',
    },
    {
      name: '收回证书/删除学员',
      size: '100px',
    },
  ];
  constructor(
    private router: ActivatedRoute,
    private certificationService: CertificationService
  ) {
    this.initial();
  }
  private prcIDControl: AbstractControl;
  private studentNameControl: AbstractControl;
  private sexControl: AbstractControl;
  private affiliationControl: AbstractControl;
  private feeControl: AbstractControl;
  private remarksControl: AbstractControl;
  private enterDateControl: AbstractControl;
  cancelDisabled = false;
  private initial() {
    this.uploadForm = new FormGroup({
      certificationFile: new FormControl(null, [Validators.required]),
    });
    this.studentFormGroup = new FormGroup({
      prcID: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.nullValidator,
          MyValidators.PRCID,
        ],
        updateOn: 'blur',
      }),
      studentName: new FormControl({ value: '', disabled: true }, {}),
      sex: new FormControl({ value: '', disabled: true }),
      affiliation: new FormControl({ value: '', disabled: true }),
      fee: new FormControl(0.0, {
        validators: [Validators.min(0.0), Validators.max(1000000)],
      }),
      enterDate: new FormControl(null, { validators: [Validators.required] }),
      remarks: new FormControl(null),
    });
    this.prcIDControl = this.studentFormGroup.controls['prcID'];
    this.prcIDControl.setAsyncValidators(this.prcIDCheck());
    this.studentNameControl = this.studentFormGroup.controls['studentName'];
    this.sexControl = this.studentFormGroup.controls['sex'];
    this.affiliationControl = this.studentFormGroup.controls['affiliation'];
    this.feeControl = this.studentFormGroup.controls['fee'];
    this.remarksControl = this.studentFormGroup.controls['remarks'];
    this.enterDateControl = this.studentFormGroup.controls['enterDate'];
  }

  public updateCourseDetail(): void {
    this.spinningFlag = true;
    this.certificationService
      .queryCertificationDetail(this.currentCourseId)
      .then((res: CertificationCourseDetail) => {
        if (res != null) {
          res.certificationCourseStudentInfo = res.certificationCourseStudentInfo.filter(
            (ci) => {
              return ci.prcID != null;
            }
          );
          this.certificationCourseDetail = res;
        }
      })
      .catch((e) => {})
      .finally(() => {
        this.spinningFlag = false;
      });
  }
  ngOnInit() {
    this.certificationService.getCertificationCategories().subscribe({
      next: (certificationCategories: CertificationCategory[]) => {
        if (certificationCategories != null) {
          this.categoriesMap = {};
          for (const c of certificationCategories) {
            this.categoriesMap[c.id] = c.name;
          }
        }
      },
    });
    this.subscribtions.push(
      this.router.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (this.currentCourseId !== id) {
          this.currentCourseId = id;
          this.updateCourseDetail();
        }
      })
    );
  }
  public showAddModal() {
    this.addStudentVisiable = true;
  }
  public addStudentToCourse(): void {
    this.cancelDisabled = true;
    this.modalOkLoading = true;
    this.certificationService
      .addStudentToCertificationCourse({
        prcID: this.prcIDControl.value as string,
        courseID: this.currentCourseId,
        fee: this.feeControl.value as number,
        createTime: (this.enterDateControl.value as Date).getTime(),
        studentAffiliation: this.affiliationControl.value as string,
        certificationID: null,
        certificationAddress: null,
        remarks: this.remarksControl.value as string,
        name: this.studentNameControl.value as string,
      })
      .then((res: Boolean) => {
        if (res) {
          this.studentFormGroup.reset();
          this.addStudentVisiable = false;
          this.updateCourseDetail();
        }
      })
      .catch((e) => {})
      .finally(() => {
        this.cancelDisabled = false;
        this.modalOkLoading = false;
      });
  }
  public handleOnCancel(): void {
    this.studentFormGroup.reset();
    this.addStudentVisiable = false;
    this.canUp = false;
  }
  private currentData: CertificationCourseStudentInfo;

  public prcIDCheck(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<null | ValidationErrors> => {
      return this.certificationService
        .queryCertificationStudentByID(control.value as string)
        .then((res: CertificationStudent) => {
          if (res == null) {
            return { error: '请先将学院建档' };
          } else {
            this.sexControl.setValue(res.sex);
            this.studentNameControl.setValue(res.name);
            this.affiliationControl.setValue(res.affiliation);
            return null;
          }
        });
    };
  }
  public downloadFile(uri: string) {
    window.open('/api/file/pdf/' + uri);
  }
  uploadForm: FormGroup;
  uploadFormShow: boolean = false;
  handleUploadModalCancel(): void {
    this.uploadForm.reset();
    this.uploadFormShow = false;
  }
  public uploadFileModal(data: CertificationCourseStudentInfo): void {
    this.uploadFormShow = true;
    this.currentData = data;
  }
  file: File;
  handleFileChange($event): void {
    this.file = $event.target.files[0];
    console.log(this.file);
    this.canUp = true;
  }
  canUp = false;
  public uploadFile(): void {
    this.certificationService
      .uploadCertificationFile(
        this.currentData.prcID,
        this.currentCourseId,
        this.file
      )
      .then((res) => {
        if (res != null) {
          this.currentData.certificationAddress = res[0];
          this.currentData.certificationID = res[1];
          this.handleUploadModalCancel();
        }
      })
      .catch((e) => {});
  }
  public revoke(data: CertificationCourseStudentInfo): void {
    this.spinningFlag = true;
    this.certificationService
      .revokeCertification(data.prcID, data.courseID, data.certificationAddress)
      .then((res: Boolean) => {
        data.certificationAddress = null;
        data.certificationID = null;
      })
      .catch((e) => {})
      .finally(() => {
        this.spinningFlag = false;
      });
  }

  public deleteStudent(prcID: string): void {
    this.spinningFlag = true;
    this.certificationService
      .deleteStudentFromCertificationCourse(prcID, this.currentCourseId)
      .then((res: Boolean) => {
        if (res) {
          this.updateCourseDetail();
        }
      })
      .catch((e) => {})
      .finally(() => {
        this.spinningFlag = false;
      });
  }

  toStudentDetail(id: string) {
    this.certificationService.toCertificationStudentDetail(id);
  }
}
