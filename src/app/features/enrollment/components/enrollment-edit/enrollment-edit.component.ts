import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EnrollmentService} from "../../service/enrollment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-enrollment-edit',
  templateUrl: './enrollment-edit.component.html',
  styleUrl: './enrollment-edit.component.css'
})
export class EnrollmentEditComponent implements OnInit {

  enrollmentEditForm: FormGroup;
  students: any;
  courses: any;

  constructor(
    private enrollmentService: EnrollmentService,
    private dialogRef: MatDialogRef<EnrollmentEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.enrollmentEditForm = this.formBuilder.group({
      student: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      course: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      scholarshipPercent: ['0', Validators.required],
      grade: ['0', Validators.required]
    });
  }

  ngOnInit(): void {
    this.enrollmentEditForm.patchValue(this.data);
    this.enrollmentService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.enrollmentService.getCoursesByCycle(this.data.currentCycleId).subscribe({
      next: (res) => {
        this.courses = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    const currentToken = localStorage.getItem('token') ?? '';
    if (currentToken != '') {
      try {
        const decodedToken: any = jwtDecode(currentToken);
        const currentRole = decodedToken.scopes[0].authority;
        if (currentRole === 'ROLE_TEACHER') {
          this.enrollmentEditForm.get('student')?.disable();
          this.enrollmentEditForm.get('course')?.disable();
          this.enrollmentEditForm.get('scholarshipPercent')?.disable();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

  }

  onSubmit() {
    if (this.enrollmentEditForm.valid) {
      if (this.data) {
        this.enrollmentService.updateEnrollment(this.data.id, this.enrollmentEditForm.getRawValue()).subscribe({
          next: (val: any) => {
            alert('Inscripción actualizada correctamente');
            this.dialogRef.close(true);
          }
        });
      } else {
        alert('Hubo un error al actualizar el registro: DATA is empty');
      }
    }
  }

}
