import {Component, Input, OnInit} from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent implements OnInit {

  @Input() cardElement: any;
  currentRole: string = "INVALID";

  ngOnInit(): void {
    const currentToken = localStorage.getItem('token') ?? '';
    if (currentToken != '') {
      try {
        const decodedToken: any = jwtDecode(currentToken);
        this.currentRole = decodedToken.scopes[0].authority;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }

}
