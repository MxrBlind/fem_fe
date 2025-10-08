import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeacherService} from "../../service/teacher.service";

@Component({
  selector: 'app-teacher-new',
  templateUrl: './teacher-new.component.html',
  styleUrl: './teacher-new.component.css'
})
export class TeacherNewComponent {

  teacherNewForm: FormGroup;

  constructor(
    private teacherService: TeacherService,
    private dialogRef: MatDialogRef<TeacherNewComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.teacherNewForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      profile: this.formBuilder.group({
        name: ['', Validators.required],
        parentLastName: ['', Validators.required],
        motherLastName: ['', Validators.required],
        email: ['', Validators.required],
        birthDate: ['', Validators.required],
        address: ['', Validators.required],
        church: ['', Validators.required]
      }),
      role: this.formBuilder.group({
        id: new FormControl({value: '2', disabled: true}, Validators.required)
      })
    });
  }

  onSubmit() {
    if (this.teacherNewForm.valid) {
      this.teacherService.addTeacher(this.teacherNewForm.getRawValue()).subscribe({
        next: (val: any) => {
          alert('¡Profesor creado exitosamente!');
          this.teacherNewForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          alert("¡Error al crear al profesor!");
        },
      });
    }
  }

}
