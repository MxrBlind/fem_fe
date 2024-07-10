import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeacherService} from "../../service/teacher.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrl: './teacher-edit.component.css'
})
export class TeacherEditComponent implements OnInit {

  teacherNewForm: FormGroup;

  constructor(
    private teacherService: TeacherService,
    private dialogRef: MatDialogRef<TeacherEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.teacherNewForm = this.formBuilder.group({
      username: new FormControl({value: data.username, disabled: true}),
      password: [''],
      profile: this.formBuilder.group({
        name: ['', Validators.required],
        parentLastName: ['', Validators.required],
        motherLastName: ['', Validators.required],
        email: ['', Validators.required],
        birthDate: ['', Validators.required],
        curp: ['', Validators.required],
        address: ['', Validators.required],
        church: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.teacherNewForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.teacherNewForm.valid) {
      if (this.data) {
        this.teacherService.updateTeacher(this.data.id, this.teacherNewForm.getRawValue()).subscribe({
          next: (val: any) => {
            alert('Profesor actualizado correctamente');
            this.dialogRef.close(true);
          }
        });
      } else {
        alert('Hubo un error al actualizar el profesor: DATA is empty');
      }
    }
  }

}
