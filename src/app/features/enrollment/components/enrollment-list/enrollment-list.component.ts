import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EnrollmentService} from "../../service/enrollment.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {EnrollmentNewComponent} from "../enrollment-new/enrollment-new.component";
import {EnrollmentEditComponent} from "../enrollment-edit/enrollment-edit.component";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.css'
})
export class EnrollmentListComponent implements OnInit {

  currentRole: string = "INVALID";
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
  currentCycleId: number = 0;

  constructor(enrollmentService: EnrollmentService, dialog: MatDialog) {
    this.dialog = dialog;
    this.enrollmentService = enrollmentService;
  }

  ngOnInit(): void {
    this.getEnrollmentList();
    this.enrollmentService.getCurrentCycle().subscribe({
      next: (cycle) => {
        this.currentCycleName = cycle.description;
        this.currentCycleId = cycle.id;
      },
      error: (err) => {
        console.log(err);
      }
    });

    const currentToken = localStorage.getItem('token') ?? '';
    if (currentToken != '') {
      try {
        const decodedToken: any = jwtDecode(currentToken);
        this.currentRole = decodedToken.scopes[0].authority;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }

  openNewEnrollmentDialog() {
    const dialogRef = this.dialog.open(EnrollmentNewComponent, {data: {currentCycleId: this.currentCycleId}});
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getEnrollmentList();
        }
      }
    });
  }

  openEditEnrollmentDialog(data: any) {
    data.currentCycleId = this.currentCycleId;
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
