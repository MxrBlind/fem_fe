import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CycleService} from "../../../service/cycle.service";
import {ToastService} from "../../../../../shared/services/toast.service";

@Component({
  selector: 'app-cycle-new',
  templateUrl: './cycle-new.component.html',
  styleUrl: './cycle-new.component.css'
})
export class CycleNewComponent  implements OnInit {

  cycleNewForm: FormGroup;
  principals: any;

  constructor(
    private cycleService: CycleService,
    private dialogRef: MatDialogRef<CycleNewComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastService,
  ) {
    this.cycleNewForm = this.formBuilder.group({
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      principal: this.formBuilder.group({
        id: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.cycleNewForm.patchValue(this.data);
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
    if (this.cycleNewForm.valid) {
      this.cycleService.addCycle(this.cycleNewForm.getRawValue()).subscribe({
        next: (val: any) => {
          this.toast.success('¡Ciclo creado exitosamente!');
          this.cycleNewForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          this.toast.error("¡Error al crear este ciclo!");
        },
      });
    }
  }

}
