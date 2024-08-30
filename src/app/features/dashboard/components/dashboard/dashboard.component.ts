import {Component, OnInit} from '@angular/core';
import {DashboardCardElement} from "./model/DashboardCardElement";
import {DashboardService} from "../../service/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboardService: DashboardService;
  currentCycleName: String = "";
  currentProgress: number = 0;
  totalStudents: number = 0;
  totalTeachers: number = 0;
  totalCourses: number = 0;

  constructor(DashboardService: DashboardService) {
    this.dashboardService = DashboardService;
  }

  ngOnInit(): void {
    this.dashboardService.getUserCount("ROLE_STUDENT").subscribe({
      next: (res) => {
        this.totalStudents = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.dashboardService.getUserCount("ROLE_TEACHER").subscribe({
      next: (res) => {
        this.totalTeachers = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.dashboardService.getCoursesCount().subscribe({
      next: (res) => {
        this.totalCourses = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.dashboardService.getCurrentCycle().subscribe({
      next: (res) => {
        this.currentCycleName = res[0].description;
        let startDate = new Date(res[0].startDate);
        let endDate = new Date(res[0].endDate);
        let nowDate = new Date();
        let totalTime = endDate.getTime() - startDate.getTime();
        let currentTime = endDate.getTime() - nowDate.getTime();
        this.currentProgress = Math.round((currentTime / totalTime) * 100) ;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCardElements(): DashboardCardElement[] {

    const studentsDashboardCard: DashboardCardElement  = new DashboardCardElement();
    const teachersDashboardCard: DashboardCardElement = new DashboardCardElement();
    const coursesDashboardCard: DashboardCardElement = new DashboardCardElement();

    studentsDashboardCard.label = "alumnos";
    studentsDashboardCard.total = this.totalStudents;
    studentsDashboardCard.action = "/student";

    teachersDashboardCard.label = "maestros";
    teachersDashboardCard.total = this.totalTeachers;
    teachersDashboardCard.action = "/teacher";

    coursesDashboardCard.label = "materias";
    coursesDashboardCard.total = this.totalCourses;
    coursesDashboardCard.action = "/course";

    return [studentsDashboardCard, teachersDashboardCard, coursesDashboardCard];
  }

}
