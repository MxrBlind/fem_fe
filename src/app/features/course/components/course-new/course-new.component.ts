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
  subjects: any;
  teachers: any;
  cycle: any;

  constructor(
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CourseNewComponent>,
    private formBuilder: FormBuilder
  ) {

    this.courseNewForm = this.formBuilder.group({
      credits: ['', Validators.required],
      teacher: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      subject: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      cycle: this.formBuilder.group({
        id: ['', Validators.required],
        description: [{value: '', disabled: true}, Validators.required]

      })
    });
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
        this.courseNewForm.patchValue({cycle: res});
        this.courseNewForm.markAsPristine();
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  onSubmit() {
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
    } else {
      //TODO: Handle errors
      console.log(this.courseNewForm.errors);
    }
  }

}
