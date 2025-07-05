import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../service/subject-service";

@Component({
  selector: 'app-subject-new',
  templateUrl: './subject-new.component.html',
  styleUrl: './subject-new.component.css'
})
export class SubjectNewComponent implements OnInit {

  subjectNewForm: FormGroup;
  categories: any;
  levels: any;

  constructor(
    private subjectService: SubjectService,
    private dialogRef: MatDialogRef<SubjectNewComponent>,
    private formBuilder: FormBuilder
  ) {
    this.subjectNewForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      level: this.formBuilder.group({
        id: ['', Validators.required],
      })
    })
  }

  ngOnInit(): void {
    this.subjectService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.subjectService.getLevels().subscribe({
      next: (res) => {
        this.levels = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit() {
    if (this.subjectNewForm.valid) {
      this.subjectService.createSubject(this.subjectNewForm.getRawValue()).subscribe({
        next: (val: any) => {
          alert('¡Materia creada exitosamente!');
          this.subjectNewForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          alert("¡Error al crear la materia!");
        },
      });
    }
  }

}
