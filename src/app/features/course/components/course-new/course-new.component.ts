import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-course-new',
  templateUrl: './course-new.component.html',
  styleUrl: './course-new.component.css'
})
export class CourseNewComponent implements OnInit {

  courseNewForm: FormGroup;

  teachers: any;
  categories: any;

  constructor(
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CourseNewComponent>,
    private formBuilder: FormBuilder
  ) {
    this.courseNewForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      credits: ['', Validators.required],
      teacher: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      category: this.formBuilder.group({
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
  }

  onSubmit() {
    console.log(this.courseNewForm.value);
    if (this.courseNewForm.valid) {
      this.courseService.createCourse(this.courseNewForm.getRawValue()).subscribe({
        next: (val: any) => {
          alert('¡Materia creada exitosamente!');
          this.courseNewForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          alert("Error al crear la materia!");
        },
      });
    }
  }

}
