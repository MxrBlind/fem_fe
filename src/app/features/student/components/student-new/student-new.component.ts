import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../service/student.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrl: './student-new.component.css'
})
export class StudentNewComponent {

  studentNewForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private dialogRef: MatDialogRef<StudentNewComponent>,
    private formBuilder: FormBuilder
  ) {
    this.studentNewForm = this.formBuilder.group({
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
        id: new FormControl({value: '3', disabled: true}, Validators.required)
      })
    });
  }

  onSubmit() {
    if (this.studentNewForm.valid) {
      this.studentService.addStudent(this.studentNewForm.getRawValue()).subscribe({
        next: (val: any) => {
          alert('¡Estudiante creado exitosamente!');
          this.studentNewForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          alert("Error al creat al estudiante!");
        },
      });
    }
  }

}
