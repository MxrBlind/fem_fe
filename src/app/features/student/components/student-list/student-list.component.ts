import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
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
export class StudentListComponent implements OnInit, AfterViewInit {

  // Usar setters para asegurar que paginator y sort se asignen al datasource cuando estén listos
  paginator!: MatPaginator;
  sort!: MatSort;
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

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  constructor(StudentService: StudentService, dialog: MatDialog) {
    this.dialog = dialog;
    this.studentService = StudentService;
  }

  ngOnInit(): void {
    this.getStudentList();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    }
  }

  openNewStudentDialog() {
    const dialogRef = this.dialog.open(StudentNewComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getStudentList();
        }
      }
    });
  }

  openEditStudentDialog(data: any) {
    const dialogRef = this.dialog.open(StudentEditComponent, {data});

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getStudentList();
        }
      }
    });
  }

  deleteStudent(id: number) {
    let confirm = window.confirm("¿Estas seguro de borrar este estudiante?");
    if (confirm) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          alert('Estudiante eliminado');
          this.getStudentList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getStudentList() {
    this.studentService.getStudents().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);

        // filterPredicate para soportar búsqueda en propiedades anidadas
        this.dataSource.filterPredicate = (item: any, filter: string) => {
          const search = (filter || '').trim().toLowerCase();
          if (!search) return true;

          const id = (item.id ?? '').toString().toLowerCase();
          const name = (item.profile?.name ?? '').toString().toLowerCase();
          const parentLast = (item.profile?.parentLastName ?? '').toString().toLowerCase();
          const motherLast = (item.profile?.motherLastName ?? '').toString().toLowerCase();
          const church = (item.profile?.church ?? '').toString().toLowerCase();

          const combined = `${id} ${name} ${parentLast} ${motherLast} ${church}`;
          return combined.includes(search);
        };

        // sortingDataAccessor para soportar dot-notation
        this.dataSource.sortingDataAccessor = (item: any, property: string) => {
          if (!item) return '';

          if (property.indexOf('.') > -1) {
            const parts = property.split('.');
            let value: any = item;
            for (const part of parts) {
              value = value ? value[part] : null;
            }
            if (value === null || value === undefined) return '';
            return (typeof value === 'string') ? value.toLowerCase() : value;
          }

          const direct = item[property];
          return (direct === null || direct === undefined) ? '' : (typeof direct === 'string' ? direct.toLowerCase() : direct);
        };

        if (this.paginator) this.dataSource.paginator = this.paginator;
        if (this.sort) this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
