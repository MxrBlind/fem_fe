import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EnrollmentService} from "../../service/enrollment.service";

@Component({
  selector: 'app-enrollment-new',
  templateUrl: './enrollment-new.component.html',
  styleUrl: './enrollment-new.component.css'
})
export class EnrollmentNewComponent implements OnInit {

  enrollmentNewForm: FormGroup;
  students: any;
  courses: any;

  constructor(
    private enrollmentService: EnrollmentService,
    private dialogRef: MatDialogRef<EnrollmentNewComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.enrollmentNewForm = this.formBuilder.group({
      student: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      course: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      scholarshipPercent: ['0', Validators.required]
    });
  }

  onSubmit() {
    if (this.enrollmentNewForm.valid) {
      this.enrollmentService.addEnrollment(this.enrollmentNewForm.getRawValue()).subscribe({
        next: (val: any) => {
          alert('¡Registro creado exitosamente!');
          this.enrollmentNewForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          alert("¡Error al crear este registro!");
        },
      });
    }
  }

  ngOnInit(): void {
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
  }
}
