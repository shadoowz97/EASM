import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { QueryCourseComponent } from './query-course/query-course.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { NoneContentComponent } from './none-content/none-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserService } from './service/user-service/user.service';
import { TabService } from './tab.service';
import { CourseService } from './service/course-service/course.service';
import { SimpleRouterReuseStrategy } from './strategy/SimpleRouterReuseStrategy';
import { CreateCourseComponent } from './create-course/create-course.component';
import { TermDetailComponent } from './term-detail/term-detail.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { QueryCategoryComponent } from './query-category/query-category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CreateTermComponent } from './create-term/create-term.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TermService } from './service/term-service/term-service.service';
import { QueryTermComponent } from './query-term/query-term.component';
registerLocaleData(zh);
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { CreateStudentProfileComponent } from './create-student-profile/create-student-profile.component';
import { CreateSpecialityComponent } from './create-speciality/create-speciality.component';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);
@NgModule({
  declarations: [			
    AppComponent,
    NavBarComponent,
    TopBarComponent,
    ServiceListComponent,
    QueryCourseComponent,
    TabBarComponent,
    NoneContentComponent,
    CourseDetailComponent,
    WelcomeComponent,
    CreateCourseComponent,
    TermDetailComponent,
    CreateCategoryComponent,
    QueryCategoryComponent,
    CategoryDetailComponent,
    CreateTermComponent,
    CreateDepartmentComponent,
    DepartmentListComponent,
    QueryTermComponent,
      StudentProfileComponent,
      CreateStudentProfileComponent,
      CreateSpecialityComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NzSpaceModule,
    NzIconModule,
    NzIconModule.forRoot(icons),
    NzButtonModule,
    NzTableModule
  ],
  providers: [
    UserService,
    TabService,
    CourseService,
    { provide: RouteReuseStrategy, useClass: SimpleRouterReuseStrategy },
    { provide: NZ_I18N, useValue: zh_CN },
    TermService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
