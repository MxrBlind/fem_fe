import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EnrollmentService} from "../../service/enrollment.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {EnrollmentNewComponent} from "../enrollment-new/enrollment-new.component";
import {EnrollmentEditComponent} from "../enrollment-edit/enrollment-edit.component";

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.css'
})
export class EnrollmentListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  enrollmentService: EnrollmentService;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'fullName',
    'profile.church',
    'course.title',
    'course.category',
    'action'
  ];
  dialog: any;
  currentCycleName: any;

  constructor(enrollmentService: EnrollmentService, dialog: MatDialog) {
    this.dialog = dialog;
    this.enrollmentService = enrollmentService;
  }

  ngOnInit(): void {
    this.getEnrollmentList();
    this.enrollmentService.getCurrentCycle().subscribe({
      next: (res) => {
        this.currentCycleName = res[0].description;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openNewEnrollmentDialog() {
    const dialogRef = this.dialog.open(EnrollmentNewComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getEnrollmentList();
        }
      }
    });
  }

  openEditEnrollmentDialog(data: any) {
    const dialogRef = this.dialog.open(EnrollmentEditComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getEnrollmentList();
        }
      }
    });
  }

  deleteEnrollment(id: number) {
    let confirm = window.confirm("¿Estas seguro de borrar este registro?");
    if (confirm) {
      this.enrollmentService.deleteEnrollment(id).subscribe({
        next: (res) => {
          alert('Registro eliminado');
          this.getEnrollmentList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getEnrollmentList() {
    this.enrollmentService.getEnrollments().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
