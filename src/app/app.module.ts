import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './features/login/components/login/login.component';
import {SharedModule} from './shared/shared.module';
import {
  DashboardCardComponent
} from './features/dashboard/components/dashboard-card/dashboard-card.component';
import {DashboardComponent} from './features/dashboard/components/dashboard/dashboard.component';
import {NavbarComponent} from './features/navbar/navbar/navbar.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {StudentListComponent} from './features/student/components/student-list/student-list.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {StudentEditComponent} from './features/student/components/student-edit/student-edit.component';
import {MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatDatepickerModule,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatSelect} from "@angular/material/select";
import { StudentNewComponent } from './features/student/components/student-new/student-new.component';
import { TeacherListComponent } from './features/teacher/components/teacher-list/teacher-list.component';
import { TeacherNewComponent } from './features/teacher/components/teacher-new/teacher-new.component';
import { TeacherEditComponent } from './features/teacher/components/teacher-edit/teacher-edit.component';

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
    TeacherEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FlexLayoutModule,
    HttpClientModule,
    MatTable,
    MatPaginator,
    MatSort,
    MatSortModule,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatNativeDateModule,
    MatDialogContent,
    FormsModule,
    MatDialogTitle,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatDialogClose,
    MatSelect,
    MatOption
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
