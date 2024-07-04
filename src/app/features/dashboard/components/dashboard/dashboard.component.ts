import {Component, OnInit} from '@angular/core';
import {DashboardCardElement} from "./model/DashboardCardElement";
import {DashboardService} from "./service/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboardService: DashboardService;
  currentCycleName: String = "Q3 2024";
  currentProgress: number = 60;
  totalStudents: number = 0;

  constructor(DashboardService: DashboardService) {
    this.dashboardService = DashboardService;
  }

  ngOnInit(): void {
    this.dashboardService.getStudentsCount().subscribe({
      next: (res) => {
        this.totalStudents = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCardElements(): DashboardCardElement[] {

    /* TODO: To be filled dynamically */
    const studentsDashboardCard: DashboardCardElement  = new DashboardCardElement();
    const coursesDashboardCard: DashboardCardElement = new DashboardCardElement();
    const enrollmentsDashboardCard: DashboardCardElement = new DashboardCardElement();

    studentsDashboardCard.label = "alumnos";
    studentsDashboardCard.total = this.totalStudents;
    studentsDashboardCard.action = "/student";

    coursesDashboardCard.label = "materias";
    coursesDashboardCard.total = 8;
    coursesDashboardCard.action = "/course";

    enrollmentsDashboardCard.label = "cursos";
    enrollmentsDashboardCard.total = 7;
    enrollmentsDashboardCard.action = "/enrollment";

    return [studentsDashboardCard, coursesDashboardCard, enrollmentsDashboardCard];
  }

}
