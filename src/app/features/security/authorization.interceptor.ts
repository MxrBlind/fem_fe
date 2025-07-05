import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentToken = localStorage.getItem('token');
    if (currentToken && !this.isTokenExpired(currentToken)) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: currentToken,
          'Content-Type': 'application/json'
        }
      });
      return next.handle(cloned);
    }

    return next.handle(request).pipe(
      tap({
        next: () => {
        },
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.router.navigate(['login']).then(r => {
            });
          }
        },
        complete: () => {
        }
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    if (!expirationDate) {
      return true; // Consider invalid tokens expired
    }
    return expirationDate <= new Date();
  }

  private getTokenExpirationDate(token: string): Date | null {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.exp) {
        return new Date(decodedToken.exp * 1000); // Convert seconds to milliseconds
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return null;
  }

}
