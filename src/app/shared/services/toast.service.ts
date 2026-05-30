import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.show(message, 'toast-success');
  }

  error(message: string): void {
    this.show(message, 'toast-error');
  }

  private show(message: string, panelClass: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: [panelClass],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
