import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../service/course.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent implements OnInit {

  courseEditForm: FormGroup;
  subjects: any;
  teachers: any;
  cycle: any;

  constructor(
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CourseEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.courseEditForm = this.formBuilder.group({
      id: ['', Validators.required],
      credits: ['', Validators.required],
      subject: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      teacher: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      cycle: this.formBuilder.group({
        id: ['', Validators.required],
        description: [{value: '', disabled: true}, Validators.required]
      })
    })
  }

  ngOnInit(): void {
    this.courseService.getSubjects().subscribe({
      next: (res) => {
        this.subjects = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.courseService.getTeachers().subscribe({
      next: (res) => {
        this.teachers = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.courseService.getCurrentCycle().subscribe({
      next: (res) => {
        this.cycle = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.courseEditForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.courseEditForm.valid) {
      this.courseService.updateCourse(this.data.id, this.courseEditForm.getRawValue()).subscribe({
        next: (val: any) => {
          this.courseEditForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          alert("¡Error al actualizar el curso!");
        },
      });
    }
  }

}
