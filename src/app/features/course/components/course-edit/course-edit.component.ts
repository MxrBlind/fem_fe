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
  teachers: any;
  categories: any;
  levels: any;

  constructor(
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CourseEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.courseEditForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      credits: ['', Validators.required],
      teacher: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      category: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      level: this.formBuilder.group({
        id: ['', Validators.required],
      })
    })
  }

  ngOnInit(): void {
    this.courseService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
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

    this.courseService.getLevels().subscribe({
      next: (res) => {
        this.levels = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.courseEditForm.patchValue(this.data);
  }

  onSubmit() {
    console.log(this.courseEditForm.value);
    if (this.courseEditForm.valid) {
      this.courseService.updateCourse(this.data.id, this.courseEditForm.getRawValue()).subscribe({
        next: (val: any) => {
          alert('¡Materia actualizada exitosamente!');
          this.courseEditForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          alert("Error al actualizar la materia!");
        },
      });
    }
  }

}
