import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../../../service/profile.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrl: './password-edit.component.css'
})
export class PasswordEditComponent implements OnInit {

  passwordEditForm: FormGroup;
  submitting = false;

  constructor(private profileService: ProfileService,
              private dialogRef: MatDialogRef<PasswordEditComponent>,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.passwordEditForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Limpiar error de mismatch cuando el usuario edita cualquiera de los dos campos
    this.newPassword?.valueChanges.subscribe(() => {
      if (this.confirmNewPassword?.hasError('mismatch')) {
        this.confirmNewPassword.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      }
    });

    this.confirmNewPassword?.valueChanges.subscribe(() => {
      if (this.confirmNewPassword?.hasError('mismatch')) {
        this.confirmNewPassword.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      }
    });
  }

  get oldPassword() {
    return this.passwordEditForm.get('oldPassword');
  }

  get newPassword() {
    return this.passwordEditForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.passwordEditForm.get('confirmNewPassword');
  }

  onSubmit(): void {
    if (this.passwordEditForm.invalid) {
      this.passwordEditForm.markAllAsTouched();
      return;
    }

    const oldPassword = this.oldPassword?.value;
    const newPassword = this.newPassword?.value;
    const confirmNewPassword = this.confirmNewPassword?.value;

    if (newPassword !== confirmNewPassword) {
      this.confirmNewPassword?.setErrors({ mismatch: true });
      return;
    }

    // Build payload - adjust according to backend API expectations
    const payload = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    this.submitting = true;
    const userId = this.data ?? 0;

    this.profileService.updateCurrentProfilePassword(userId, payload).subscribe({
      next: () => {
        this.submitting = false;
        this.snackBar.open('Contraseña actualizada correctamente', 'Cerrar', {duration: 3000});
        // Reset the form and close dialog indicating success
        this.passwordEditForm.reset();
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.submitting = false;
        const message = err?.error?.message ?? 'Error al actualizar la contraseña';
        this.snackBar.open(message, 'Cerrar', {duration: 5000});
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
