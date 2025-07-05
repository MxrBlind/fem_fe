import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.loginUser(this.loginForm.getRawValue()).subscribe({
        next: (val: any) => {
          this.loginForm.reset();
          const tokenHeader = val.type + " " + val.token;
          localStorage.setItem('token', tokenHeader);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error: (err: any) => {
          console.error(err);
          alert("Usuario o password incorrectos.");
        },
      });
    }
  }

}
