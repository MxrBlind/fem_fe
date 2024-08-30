import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./features/dashboard/components/dashboard/dashboard.component";
import {StudentListComponent} from "./features/student/components/student-list/student-list.component";
import {TeacherListComponent} from "./features/teacher/components/teacher-list/teacher-list.component";
import {CourseListComponent} from "./features/course/components/course-list/course-list.component";
import {EnrollmentListComponent} from "./features/enrollment/components/enrollment-list/enrollment-list.component";

const routes: Routes = [
  {path:"", component: DashboardComponent},
  {path:"dashboard", component: DashboardComponent},
  {path:"student", component: StudentListComponent},
  {path:"teacher", component: TeacherListComponent},
  {path:"course", component: CourseListComponent},
  {path:"enrollment", component: EnrollmentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
