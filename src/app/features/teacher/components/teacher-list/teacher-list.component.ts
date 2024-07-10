import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TeacherService} from "../../service/teacher.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {TeacherNewComponent} from "../teacher-new/teacher-new.component";
import {TeacherEditComponent} from "../teacher-edit/teacher-edit.component";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  teacherService: TeacherService;
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

  constructor(teacherService: TeacherService, dialog: MatDialog) {
    this.teacherService = teacherService;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.getTeacherList();
  }

  openNewTeacherDialog() {
    const dialogRef = this.dialog.open(TeacherNewComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getTeacherList();
        }
      }
    });
  }

  openEditSTeacherDialog(data: any) {
    const dialogRef = this.dialog.open(TeacherEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getTeacherList();
        }
      }
    });
  }

  deleteTeacher(id: number) {
    let confirm = window.confirm("¿Estas seguro de borrar este maestro?");
    if (confirm) {
      this.teacherService.deleteTeacher(id).subscribe({
        next: (res) => {
          alert('Maestro eliminado');
          this.getTeacherList();
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

  private getTeacherList() {
    this.teacherService.getTeachers().subscribe({
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
