import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {StudentEditComponent} from "../student-edit/student-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {StudentNewComponent} from "../student-new/student-new.component";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  studentService: StudentService;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'profile.name',
    'profile.parentLastName',
    'profile.motherLastName',
    'profile.church',
    'action'
  ];
  dialog: any;

  constructor(StudentService: StudentService, dialog: MatDialog) {
    this.dialog = dialog;
    this.studentService = StudentService;
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  deleteStudent(id: number) {
    let confirm = window.confirm("¿Estas seguro de borrar este estudiante?");
    if(confirm) {
      this.studentService.deleteStudent(id).subscribe({
        next: (res) => {
          alert('Estudiante eliminado');
          this.getEmployeeList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(StudentEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }

  openNewEmployeeDialog() {
    const dialogRef = this.dialog.open(StudentNewComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getEmployeeList() {
    this.studentService.getStudents().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
