import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EnrollmentService} from "../../service/enrollment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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

    this.enrollmentService.getCourses().subscribe({
      next: (res) => {
        this.courses = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit() {
    if (this.enrollmentEditForm.valid) {
      if (this.data) {
        this.enrollmentService.updateEnrollment(this.data.id, this.enrollmentEditForm.getRawValue()).subscribe({
          next: (val: any) => {
            alert('Registro actualizado correctamente');
            this.dialogRef.close(true);
          }
        });
      } else {
        alert('Hubo un error al actualizar el registro: DATA is empty');
      }
    }
  }

}
