import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';

import {LoginComponent} from './features/login/components/login/login.component';
import {
  DashboardCardComponent
} from './features/dashboard/components/dashboard-card/dashboard-card.component';
import {DashboardComponent} from './features/dashboard/components/dashboard/dashboard.component';
import {NavbarComponent} from './features/navbar/navbar/navbar.component';

import {StudentListComponent} from './features/student/components/student-list/student-list.component';
import {StudentEditComponent} from './features/student/components/student-edit/student-edit.component';
import {StudentNewComponent} from './features/student/components/student-new/student-new.component';
import {TeacherListComponent} from './features/teacher/components/teacher-list/teacher-list.component';
import {TeacherNewComponent} from './features/teacher/components/teacher-new/teacher-new.component';
import {TeacherEditComponent} from './features/teacher/components/teacher-edit/teacher-edit.component';
import { CourseListComponent } from './features/course/components/course-list/course-list.component';
import { CourseNewComponent } from './features/course/components/course-new/course-new.component';
import { CourseEditComponent } from './features/course/components/course-edit/course-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardCardComponent,
    DashboardComponent,
    NavbarComponent,
    StudentListComponent,
    StudentEditComponent,
    StudentNewComponent,
    TeacherListComponent,
    TeacherNewComponent,
    TeacherEditComponent,
    CourseListComponent,
    CourseNewComponent,
    CourseEditComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDialogClose,
    MatSelect,
    MatOption,
    MatTable,
    MatColumnDef,
    MatSort,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatHeaderCellDef,
    MatCellDef,
    MatNoDataRow,
    MatRowDef,
    MatHeaderRowDef,
    FlexModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
