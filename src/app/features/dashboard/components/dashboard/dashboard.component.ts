import { Component } from '@angular/core';
import {DashboardCardElement} from "./model/DashboardCardElement";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentCycleName: String = "Q3 2024";
  currentProgress: number = 60;

  getCardElements(): DashboardCardElement[] {

    /* TODO: To be filled dynamically */
    const studentsDashboardCard: DashboardCardElement  = new DashboardCardElement();
    const coursesDashboardCard: DashboardCardElement = new DashboardCardElement();
    const enrollmentsDashboardCard: DashboardCardElement = new DashboardCardElement();

    studentsDashboardCard.label = "alumnos";
    studentsDashboardCard.total = 25;

    coursesDashboardCard.label = "materias";
    coursesDashboardCard.total = 8;

    enrollmentsDashboardCard.label = "cursos";
    enrollmentsDashboardCard.total = 7;

    return [studentsDashboardCard, coursesDashboardCard, enrollmentsDashboardCard];
  }

}
