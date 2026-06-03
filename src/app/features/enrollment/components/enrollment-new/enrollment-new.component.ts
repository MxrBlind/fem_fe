import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EnrollmentService} from "../../service/enrollment.service";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: 'app-enrollment-new',
  templateUrl: './enrollment-new.component.html',
  styleUrl: './enrollment-new.component.css'
})
export class EnrollmentNewComponent implements OnInit {

  enrollmentNewForm: FormGroup;
  students: any[] = [];
  filteredStudents: any[] = [];
  courses: any[] = [];
  filteredCourses: any[] = [];
  studentFilter = new FormControl('');
  courseFilter = new FormControl('');

  constructor(
    private enrollmentService: EnrollmentService,
    private dialogRef: MatDialogRef<EnrollmentNewComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastService,
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
          this.toast.success('¡Registro creado exitosamente!');
          this.enrollmentNewForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          this.toast.error("¡Error al crear este registro!");
        },
      });
    }
  }

  ngOnInit(): void {
    this.enrollmentService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.filteredStudents = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.enrollmentService.getCoursesByCycle(this.data.currentCycleId).subscribe({
      next: (res) => {
        this.courses = res;
        this.filteredCourses = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.studentFilter.valueChanges.subscribe(val => {
      const search = (val || '').toLowerCase();
      this.filteredStudents = this.students.filter(s =>
        `${s.profile.name} ${s.profile.parentLastName}`.toLowerCase().includes(search)
      );
    });

    this.courseFilter.valueChanges.subscribe(val => {
      const search = (val || '').toLowerCase();
      this.filteredCourses = this.courses.filter(c =>
        c.subject.description.toLowerCase().includes(search)
      );
    });
  }
}
