import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CycleService} from "../../../service/cycle.service";

@Component({
  selector: 'app-cycle-edit',
  templateUrl: './cycle-edit.component.html',
  styleUrl: './cycle-edit.component.css'
})
export class CycleEditComponent implements OnInit {

  cycleEditForm: FormGroup;
  principals: any;

  constructor(
    private cycleService: CycleService,
    private dialogRef: MatDialogRef<CycleEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.cycleEditForm = this.formBuilder.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      principal: this.formBuilder.group({
        id: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.cycleEditForm.patchValue(this.data);
    this.cycleService.getPrincipals().subscribe({
      next: (res) => {
        this.principals = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit() {
    if (this.cycleEditForm.valid) {
      if (this.data) {
        this.cycleService.updateCycle(this.data.id, this.cycleEditForm.getRawValue()).subscribe({
          next: (val: any) => {
            alert('Ciclo actualizado correctamente');
            this.dialogRef.close(true);
          }
        });
      } else {
        alert('Hubo un error al actualizar el ciclo: DATA is empty');
      }
    }
  }

}
