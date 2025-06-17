import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../service/subject-service";

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrl: './subject-edit.component.css'
})
export class SubjectEditComponent implements OnInit {

  subjectEditForm: FormGroup;
  categories: any;
  levels: any;

  constructor(
    private subjectService: SubjectService,
    private dialogRef: MatDialogRef<SubjectEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.subjectEditForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      level: this.formBuilder.group({
        id: ['', Validators.required]
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

    this.subjectEditForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.subjectEditForm.valid) {
      this.subjectService.updateSubject(this.data.id, this.subjectEditForm.getRawValue()).subscribe({
        next: (val: any) => {
          alert('¡Materia actualizada exitosamente!');
          this.subjectEditForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          alert("¡Error al actualizar la materia!");
        },
      });
    }
  }

}
