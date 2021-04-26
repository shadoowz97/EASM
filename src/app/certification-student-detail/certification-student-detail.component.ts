/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-23 16:02:04
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-25 09:51:45
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificationService } from '../service/certification-service/certification.service';
import { CertificationStudentDetail } from '../dataDef/certification-student-detail';
import { CertificationCourseStudentInfo } from '../dataDef/CertificationCourseStudentInfo';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-certification-student-detail',
  templateUrl: './certification-student-detail.component.html',
  styleUrls: ['./certification-student-detail.component.scss'],
})
export class CertificationStudentDetailComponent implements OnInit {
  studentDetail: CertificationStudentDetail;
  private currentStudentId: string;
  spinningFlag = true;
  userState: number;
  constructor(
    private router: ActivatedRoute,
    private certificationService: CertificationService,
    private msg: NzMessageService,
    private usrService: UserService
  ) {
    this.usrService.subscribeUser().subscribe({
      next: (o) => {
        this.userState = o.userState;
      },
    });
  }
  noneOp(): void {}
  colConfig = [
    {
      name: '证书名称',
      size: '130px',
    },
    {
      name: '课程名称',
      size: '150px',
    },
    {
      name: '开始日期',
      size: '100px',
    },
    {
      name: '结束日期',
      size: '100px',
    },
    {
      name: '地点',
      size: '100px',
    },
    { name: '课时', size: '70px' },
    {
      name: '下载',
      size: '90px',
    },
  ];
  public downloadFile(uri: string): void {
    if (uri == null) {
      this.msg.error('尚未颁发证书');
    }
    window.open('/api/file/pdf/' + uri);
  }
  updateStudentDetail(): void {
    this.spinningFlag = true;
    this.certificationService
      .queryCertificationStudentDetail(this.currentStudentId)
      .then((res: CertificationStudentDetail) => {
        if (res != null) {
          this.studentDetail = res;
        } else {
          this.msg.error('更新信息失败，请稍后重试或联系管理员');
        }
      })
      .catch((e) => {})
      .finally(() => {
        this.spinningFlag = false;
      });
  }
  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (this.currentStudentId !== id) {
        this.currentStudentId = id;
        this.updateStudentDetail();
      }
    });
  }

  toCertificationCourseDetail(courseId: string) {
    this.certificationService.toCertificationCourseDetail(courseId);
  }
}
