import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CreateTermComponent } from './create-term/create-term.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { QueryTermComponent } from './query-term/query-term.component';
import { CreateStudentProfileComponent } from './create-student-profile/create-student-profile.component';
import { CreateSpecialityComponent } from './create-speciality/create-speciality.component';
import { CreateSchoolYearComponent } from './create-school-year/create-school-year.component';
import { CreateAdministrativeClassComponent } from './create-administrative-class/create-administrative-class.component';
import { SchoolYearListComponent } from './schoolYear-list/schoolYear-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
import { AdministrativeClazzListComponent } from './administrativeClazz-list/administrativeClazz-list.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AdClazzDetailComponent } from './adClazz-Detail/adClazz-Detail.component';
import { EmployeeDetailComponent } from './employee-Detail/employee-Detail.component';
import { StudentSupervisorRelationComponent } from './student-supervisor-relation/student-supervisor-relation.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { CreateCertificationCategoryComponent } from './create-certification-category/create-certification-category.component';
import { CertificationCategoryListComponent } from './certification-category-list/certification-category-list.component';
import { CreateCertificationCourseComponent } from './create-certification-course/create-certification-course.component';
import { CertificationCourseListComponent } from './certification-course-list/certification-course-list.component';
const routes: Routes = [
  {
    path: 'queryCourse',
    component: CourseListComponent,
    data: { keep: true },
  },
  {
    path: 'courseDetail/:courseId',
    component: CourseDetailComponent,
    data: { keep: false },
  },
  {
    path: 'categoryDetail/:categoryDetail',
    component: CategoryDetailComponent,
    data: { keep: true },
  },
  { path: 'welcome', component: WelcomeComponent, data: { keep: false } },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'createCourse',
    component: CreateCourseComponent,
    data: { keep: true },
  },
  {
    path: 'createTerm',
    component: CreateTermComponent,
    data: { keep: true },
  },
  {
    path: 'createCategory',
    component: CreateCategoryComponent,
    data: { keep: true },
  },
  {
    path: 'queryCategory',
    component: CategoryListComponent,
    data: { keep: true },
  },
  {
    path: 'departmentList',
    component: DepartmentListComponent,
    data: { keep: true },
  },
  {
    path: 'createDepartment',
    component: CreateDepartmentComponent,
    data: { keep: true },
  },
  {
    path: 'queryTerm',
    component: QueryTermComponent,
    data: { keep: true },
  },
  {
    path: 'createNewStudent',
    component: CreateStudentProfileComponent,
    data: { keep: true },
  },
  {
    path: 'createSpeciality',
    component: CreateSpecialityComponent,
    data: { keep: true },
  },
  {
    path: 'createSchoolYear',
    component: CreateSchoolYearComponent,
    data: { keep: true },
  },
  {
    path: 'createAdministrativeClass',
    component: CreateAdministrativeClassComponent,
    data: { keep: true },
  },
  {
    path: 'schoolYearList',
    component: SchoolYearListComponent,
    data: { keep: true },
  },
  {
    path: 'createEmployee',
    component: CreateEmployeeComponent,
    data: { keep: true },
  },
  {
    path: 'departmentDetail/:id',
    component: DepartmentDetailComponent,
    data: { keep: true },
  },
  {
    path: 'specialityList',
    component: SpecialityListComponent,
    data: { keep: false },
  },
  {
    path: 'adClassList',
    component: AdministrativeClazzListComponent,
    data: { keep: false },
  },
  {
    path: 'adClassDetail/:id',
    component: AdClazzDetailComponent,
    data: { keep: false },
  },
  {
    path: 'employeeDetail/:id',
    component: EmployeeDetailComponent,
    data: { keep: false },
  },
  {
    path: 'establishSupervisorRelation',
    component: StudentSupervisorRelationComponent,
    data: { keep: false },
  },
  {
    path: 'studentDetail/:id',
    component: StudentDetailComponent,
    data: { keep: false },
  },
  {
    path: 'uploadImage',
    component: ImageUploadComponent,
    data: { keep: true },
  },
  {
    path: 'createCertificationCategory',
    component: CreateCertificationCategoryComponent,
    data: { keep: true },
  },
  {
    path: 'certificationCategoriesList',
    component: CertificationCategoryListComponent,
    data: { keep: true },
  },
  {
    path: 'createCertificationCourse',
    component: CreateCertificationCourseComponent,
    data: { keep: true },
  },
  {
    path: 'queryCerificationCourse',
    component: CertificationCourseListComponent,
    data: { keep: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
