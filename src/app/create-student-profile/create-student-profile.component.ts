import { Component, OnInit } from '@angular/core';
import { StudentProfileModel } from '../dataDef/StudentProfileModel';
import { AdministrativeClazzService } from '../service/ad-clazz/administrative-clazz.service';
import { AdministrativeClazz } from '../dataDef/AdministrativeClazz';
import { NzUploadFile, NzMessageService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { SpecialityInfo } from '../dataDef/SpecialityInfo';
import { DepartmentInfo } from '../dataDef/DepartmentInfo';
import { DepartmentService } from '../service/department-service/department.service';
import { FamilyRelation } from '../dataDef/FamilyRelation';
import { PersonTrace } from '../dataDef/PersonTrace';

import { StudentProfileComponent } from '../student-profile/student-profile.component';
import { EAService } from '../service/ea-service/EA-service.service';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-create-student-profile',
  templateUrl: './create-student-profile.component.html',
  styleUrls: ['./create-student-profile.component.css'],
})
export class CreateStudentProfileComponent implements OnInit {
  constructor(
    private adClazzService: AdministrativeClazzService,
    private msg: NzMessageService,
    private eaService: EAService,
    private departmentService: DepartmentService,
    private usrService: UserService
  ) {}
  studentProfile: StudentProfileModel;
  nationOption: string[];
  clickTime = 0;
  adClazzList: AdministrativeClazz[];
  specialityList: SpecialityInfo[];
  departmentList: DepartmentInfo[];
  personTrace: PersonTrace[] = [];
  errorStack: String[];
  familyRelations: FamilyRelation[] = [
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
  pIDList = ['群众', '党员', '共青团员', '其他'];

  nations =
    '汉族、蒙古族、回族、藏族、维吾尔族、苗族、彝族、壮族、布依族、朝鲜族、满族、侗族、瑶族、白族、土家族、哈尼族、哈萨克族、傣族、黎族、僳僳族、佤族、畲族、高山族、拉祜族、水族、东乡族、纳西族、景颇族、柯尔克孜族、土族、达斡尔族、仫佬族、羌族、布朗族、撒拉族、毛南族、仡佬族、锡伯族、阿昌族、普米族、塔吉克族、怒族、乌孜别克族、俄罗斯族、鄂温克族、德昂族、保安族、裕固族、京族、塔塔尔族、独龙族、鄂伦春族、赫哲族、门巴族、珞巴族、基诺族';
  loading = false;
  avatarUrl?: string;

  ngOnInit() {
    this.studentProfile = new StudentProfileModel();
    this.init();
  }
  private init() {
    this.personTrace = [];
    for (let i = 0; i < 10; i++) {
      this.personTrace.push({
        startDate: null,
        endDate: null,
        dateRange: [null, null],
        workType: '',
        place: '',
      });
    }
    this.familyRelations = [
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
  }

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
  checkFunc() {
    this.nameCheck();
    this.studengIdCheck();
    this.birthDayCheck();
    this.nationCheck();
    this.sexCheck();
    this.familyAddressCheck();
    this.idNumberCheck();
    this.pinyinCheck();
    this.administrativeClazzCheck();
    this.contactTelCheck();
    this.specialityCheck();
    this.nativePlaceCheck();
    this.dormCheck();
    this.departmentCheck();
    this.pIDCheck();
    this.eMailCheck();
    this.postCodeCheck();
    this.familyTelCheck();
    this.familyRelationShipCheck();
    this.personTraceCheck();
  }
  async submit(){
    this.errorStack = [];
    this.checkFunc();
    if (this.errorStack.length == 0) {
      this.msg.success(JSON.stringify(this.studentProfile));
      var cFlag = false;
      await this.usrService
        .createStudent(this.studentProfile)
        .then((res: boolean) => {
          cFlag = res;
        });
      if (cFlag) {
        this.studentProfile = new StudentProfileModel();
        this.init();
      }
    } else {
      let errInfo = '';
      for (let e of this.errorStack) {
        errInfo += e + '<br>';
      }
      this.msg.error(errInfo);
    }
  }
  personTraceCheck() {
    this.studentProfile.personTrace = [];
    for (let pt of this.personTrace) {
      if (this.nullOrNothingCheck(pt.place)) break;
      else {
        if (pt.place == '' || pt.workType == '') {
          this.errorStack.push('请将个人履历填写完整');
        } else {
          pt.startDate = pt.dateRange[0];
          pt.endDate = pt.dateRange[1];
          this.studentProfile.personTrace.push(pt);
        }
      }
    }
    if (this.studentProfile.personTrace.length == 0)
      this.errorStack.push('请至少填写一项履历信息');
  }
  familyRelationShipCheck() {
    this.studentProfile.familyRelation = [];
    for (let fr of this.familyRelations) {
      if (this.nullOrNothingCheck(fr.relation)) {
        break;
      } else {
        if (fr.name == '' || fr.workplace == '' || fr.tel == '')
          this.errorStack.push('请将家庭关系信息填写完整');
        else this.studentProfile.familyRelation.push(fr);
      }
    }
    if (this.studentProfile.familyRelation.length == 0) {
      this.errorStack.push('请至少填写一项家庭成员信息');
    }
  }
  familyTelCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.familyTel)) {
      this.errorStack.push('紧急联系人电话不能为空');
    }
  }
  postCodeCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.postCode)) {
      this.errorStack.push('邮编不能为空');
    }
  }
  eMailCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.email)) {
      this.errorStack.push('邮箱不能为空');
    } else {
      let re = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (re.test(this.studentProfile.email) == false) {
        this.errorStack.push('邮箱格式不正确');
      }
    }
  }
  pIDCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.pID)) {
      this.errorStack.push('政治面貌不能为空');
    }
  }
  departmentCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.departmentId))
      this.errorStack.push('所属中心不能为空');
  }
  dormCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.dorm)) {
      this.studentProfile.dorm = '';
    }
  }
  nativePlaceCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.nativePlace)) {
      this.errorStack.push('籍贯不能为空');
    }
  }
  specialityCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.specialityId))
      this.errorStack.push('专业名不能为空');
  }

  administrativeClazzCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.administrativeClazzId)) {
      this.errorStack.push('行政班级不能为空');
    }
  }
  contactTelCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.contactTel)) {
      this.errorStack.push('联系电话不能为空');
    }
  }
  pinyinCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.pinyin)) {
      this.errorStack.push('拼音不能为空');
    } else {
      let re = /[^A-Za-z]/;
      if (re.test(this.studentProfile.pinyin)) {
        this.errorStack.push('姓名拼音不合法');
        this.studentProfile.pinyin = '';
      }
    }
  }
  idNumberCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.idNumber)) {
      this.errorStack.push('身份证号不能为空');
    } else {
      let re = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (re.test(this.studentProfile.idNumber) == false)
        this.errorStack.push('非法的身份证号 ');
    }
  }
  familyAddressCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.familyAddress)) {
      this.errorStack.push('家庭地址不能为空');
    }
  }
  sexCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.sex))
      this.errorStack.push('性别不能为空');
  }
  nationCheck() {
    if (this.nullOrNothingCheck(this.studentProfile))
      this.errorStack.push('民族不能为空！');
  }
  studengIdCheck() {
    let falg_2 = this.nullOrNothingCheck(this.studentProfile.studentId);
    if (falg_2) {
      this.errorStack.push('学号不能为空');
    } else {
      let re = /[^A-Za-z0-9]/;
      let studentIdCheck = re.test(this.studentProfile.studentId);
      if (studentIdCheck) {
        this.errorStack.push('学号不合法');
      }
    }
  }
  /**
   *
   * @param value
   *
   * @returns boolean
   *
   * @description if the value is null or nothing ,return true else return false
   */
  nullOrNothingCheck(value: any): boolean {
    return value == null || value == '';
  }

  nameCheck() {
    if (this.nullOrNothingCheck(this.studentProfile.studentName)) {
      this.errorStack.push('姓名不能为空');
    }
  }

  birthDayCheck() {
    let flag = this.nullOrNothingCheck(this.studentProfile.birthDay);
    if (flag) {
      this.errorStack.push('生日不能为空！');
    }
  }
}
