import {Component, OnInit} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  currentRole: string = "INVALID";


  constructor(private router: Router) {
  }

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

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}
