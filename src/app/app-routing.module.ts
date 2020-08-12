import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryCourseComponent } from './query-course/query-course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { QueryCategoryComponent } from './query-category/query-category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CreateTermComponent } from './create-term/create-term.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { QueryTermComponent } from './query-term/query-term.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { CreateStudentProfileComponent } from './create-student-profile/create-student-profile.component';
import { CreateSpecialityComponent } from './create-speciality/create-speciality.component';
import { CreateSchoolYearComponent } from './create-school-year/create-school-year.component';
const routes: Routes = [
  {
    path: 'queryCourse',
    component: QueryCourseComponent,
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
    data: { keep: false },
  },
  { path: 'welcome', component: WelcomeComponent, data: { keep: false } },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'createCourse',
    component: CreateCourseComponent,
    data: { keep: false },
  },
  {
    path: 'createTerm',
    component: CreateTermComponent,
    data: { keep: true },
  },
  {
    path: 'createCategory',
    component: CreateCategoryComponent,
    data: { keep: false },
  },
  {
    path: 'queryCategory',
    component: QueryCategoryComponent,
    data: { keep: false },
  },
  {
    path: 'departmentList',
    component: DepartmentListComponent,
    data: { keep: false },
  },
  {
    path: 'createDepartment',
    component: CreateDepartmentComponent,
    data: { keep: false },
  },
  {
    path: 'queryTerm',
    component: QueryTermComponent,
    data: { keep: true },
  },
  {
    path: 'createNewStudent',
    component: CreateStudentProfileComponent,
    data: { keep: false },
  },
  {
    path: 'createSpeciality',
    component: CreateSpecialityComponent,
    data: { keep: false },
  },
  {
    path: 'createSchoolYear',
    component: CreateSchoolYearComponent,
    data: { keep: false },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
