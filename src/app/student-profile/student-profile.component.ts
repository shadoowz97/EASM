import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentProfileModel } from '../dataDef/StudentProfileModel';
import { AdministrativeClazzService } from '../service/ad-clazz/administrative-clazz.service';
import { AdministrativeClazz } from '../dataDef/AdministrativeClazz';
import { NzUploadFile, NzMessageService } from 'ng-zorro-antd';
import { Observable, Observer, Subscription } from 'rxjs';
import { SpecialityInfo } from '../dataDef/SpecialityInfo';
import { DepartmentInfo } from '../dataDef/DepartmentInfo';
import { DepartmentService } from '../service/department-service/department.service';
import { FamilyRelation } from '../dataDef/FamilyRelation';
import { PersonTrace } from '../dataDef/PersonTrace';
import { Input } from '@angular/core';
import { EAService } from '../service/ea-service/EA-service.service';
import { ResSet } from '../dataDef/ResSet';
import { SchoolYear } from '../dataDef/SchoolYear';
import { SchoolYearService } from '../service/school-year-service/school-year.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  @Input() studentProfile: StudentProfileModel;
  subscriptions: Subscription[] = [];
  nationOption: string[];
  clickTime = 0;
  adClazzList: AdministrativeClazz[];
  specialityList: SpecialityInfo[];
  departmentList: DepartmentInfo[];
  degree: string[];
  schoolYears: SchoolYear[];
  @Input() personTrace: PersonTrace[];
  @Input() familyRelations: FamilyRelation[] = [
    {
      name: '',
      tel: null,
      workplace: '',
      relation: '',
    },
    {
      name: '',
      workplace: '',
      relation: '',
      tel: null,
    },
    {
      tel: null,
      name: '',
      workplace: '',
      relation: '',
    },
  ];
  @Input() mode: string;
  pIDList = ['群众', '党员', '共青团员', '其他'];
  nations =
    '汉族、蒙古族、回族、藏族、维吾尔族、苗族、彝族、壮族、布依族、朝鲜族、满族、侗族、瑶族、白族、土家族、哈尼族、哈萨克族、傣族、黎族、僳僳族、佤族、畲族、高山族、拉祜族、水族、东乡族、纳西族、景颇族、柯尔克孜族、土族、达斡尔族、仫佬族、羌族、布朗族、撒拉族、毛南族、仡佬族、锡伯族、阿昌族、普米族、塔吉克族、怒族、乌孜别克族、俄罗斯族、鄂温克族、德昂族、保安族、裕固族、京族、塔塔尔族、独龙族、鄂伦春族、赫哲族、门巴族、珞巴族、基诺族';
  constructor(
    private adClazzService: AdministrativeClazzService,
    private msg: NzMessageService,
    private eaService: EAService,
    private departmentService: DepartmentService,
    private schoolYearService: SchoolYearService
  ) {
    this.nationOption = this.nations
      .split('、')
      .map((value) => value.substring(0, value.length - 1));
    this.adClazzService
      .getAdministrativeClazzList()
      .then((res: AdministrativeClazz[]) => {
        this.adClazzList = res.filter(
          (value: AdministrativeClazz) => value.state == 'on'
        );
      });
    this.eaService.getSpecialities().then((res: SpecialityInfo[]) => {
      console.error('load speciality');
      this.specialityList = res;
    });
    this.subscriptions.push(
      this.departmentService.getDepartments().subscribe({
        next: (departmentInfos: DepartmentInfo[]) => {
          this.departmentList = departmentInfos.filter((value) => {
            return value.departmentState == 'active';
          });
        },
      })
    );

    this.eaService.getDegree().then((res: string[]) => {
      this.degree = res;
    });
    this.schoolYearService.getSchoolYearList().then((res) => {
      this.schoolYears = res;
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit() {}
  loading = false;
  avatarUrl?: string;

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
