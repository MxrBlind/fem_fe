import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../service/student.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent implements OnInit {

  studentEditForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private dialogRef: MatDialogRef<StudentEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.studentEditForm = this.formBuilder.group({
      username: new FormControl({value: '', disabled: true}),
      password: [''],
      profile: this.formBuilder.group({
        name: ['', Validators.required],
        parentLastName: ['', Validators.required],
        motherLastName: ['', Validators.required],
        email: ['', Validators.required],
        birthDate: ['', Validators.required],
        address: ['', Validators.required],
        church: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.studentEditForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.studentEditForm.valid) {
      if (this.data) {
        this.studentService.updateStudent(this.data.id, this.studentEditForm.getRawValue()).subscribe({
          next: (val: any) => {
            alert('Estudiante actualizado correctamente');
            this.dialogRef.close(true);
          }
        });
      } else {
        alert('Hubo un error al actualizar el estudiante: DATA is empty');
      }
    }
  }

}
