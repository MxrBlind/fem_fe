import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./features/dashboard/components/dashboard/dashboard.component";
import {StudentListComponent} from "./features/student/components/student-list/student-list.component";

const routes: Routes = [
  {path:"", component: DashboardComponent},
  {path:"dashboard", component: DashboardComponent},
  {path:"student", component: StudentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
