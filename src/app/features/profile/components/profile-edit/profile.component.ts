import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../service/profile.service";
import {MatDialog} from "@angular/material/dialog";
import {PasswordEditComponent} from "../password-edit/password-edit/password-edit.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileEditForm: FormGroup;
  currentUser: any;

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.dialog = dialog;
    this.profileEditForm = this.formBuilder.group({
      name: ['', Validators.required],
      parentLastName: ['', Validators.required],
      motherLastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      church: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCurrentUserProfile();
  }

  onSubmit() {
    if (this.profileEditForm.valid) {
      const updatedProfile = this.profileEditForm.value;
      this.profileService.updateCurrentProfile(this.currentUser.id, updatedProfile).subscribe({
        next: (val: any) => {
          this.currentUser.profile = val;
          alert('Perfil actualizado correctamente');
          // Reload the profile from the server and update the form so it reflects saved data
          this.getCurrentUserProfile();
          // mark form as pristine/untouched to reflect saved state
          this.profileEditForm.markAsPristine();
          this.profileEditForm.markAsUntouched();
        }
      });
    }
  }

  getCurrentUserProfile() {
    this.profileService.getCurrentUserProfile().subscribe({
      next: (val: any) => {
        this.currentUser = val;
        this.profileEditForm.patchValue(this.currentUser.profile);
      }
    });
  }

  openNewPasswordDialog(data: any) {
    const dialogRef = this.dialog.open(PasswordEditComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          alert('Password actualizado correctamente');
          this.getCurrentUserProfile();
        }
      }
    });
  }
}
