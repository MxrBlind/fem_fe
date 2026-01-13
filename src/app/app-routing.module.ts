import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./features/dashboard/components/dashboard/dashboard.component";
import {StudentListComponent} from "./features/student/components/student-list/student-list.component";
import {TeacherListComponent} from "./features/teacher/components/teacher-list/teacher-list.component";
import {CourseListComponent} from "./features/course/components/course-list/course-list.component";
import {EnrollmentListComponent} from "./features/enrollment/components/enrollment-list/enrollment-list.component";
import {LoginComponent} from "./features/login/components/login/login.component";
import {SubjectListComponent} from "./features/subject/components/subject-list/subject-list.component";
import {CycleListComponent} from "./features/cycle/components/cycle-list/cycle-list.component";
import {
  CurrentCycleListComponent
} from "./features/cycle/components/current-cycle-list/current-cycle-list.component";
import {ProfileComponent} from "./features/profile/components/profile-edit/profile.component";

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "student", component: StudentListComponent},
  {path: "teacher", component: TeacherListComponent},
  {path: "course", component: CourseListComponent},
  {path: "subject", component: SubjectListComponent},
  {path: "cycle", component: CycleListComponent},
  {path: "cycle/current", component: CurrentCycleListComponent},
  {path: "enrollment", component: EnrollmentListComponent},
  {path: "profile", component: ProfileComponent},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
