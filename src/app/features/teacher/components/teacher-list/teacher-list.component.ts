import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
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
export class TeacherListComponent implements OnInit, AfterViewInit {

  // usar setters en los ViewChild para asignar paginator y sort cuando estén disponibles
  paginator!: MatPaginator;
  sort!: MatSort;
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

  constructor(teacherService: TeacherService, dialog: MatDialog) {
    this.teacherService = teacherService;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.getTeacherList();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    }
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
        next: () => {
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
    if (!this.dataSource) return;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getTeacherList() {
    this.teacherService.getTeachers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);

        // filterPredicate para soportar búsqueda en propiedades anidadas y nombre completo
        this.dataSource.filterPredicate = (item: any, filter: string) => {
          const search = (filter || '').trim().toLowerCase();
          if (!search) return true;

          const id = (item.id ?? '').toString().toLowerCase();
          const name = (item.profile?.name ?? '').toString().toLowerCase();
          const parentLast = (item.profile?.parentLastName ?? '').toString().toLowerCase();
          const motherLast = (item.profile?.motherLastName ?? '').toString().toLowerCase();
          const church = (item.profile?.church ?? '').toString().toLowerCase();
          const fullName = (name + ' ' + parentLast).trim().toLowerCase();

          const combined = `${id} ${name} ${parentLast} ${motherLast} ${church} ${fullName}`;
          return combined.includes(search);
        };

        // sortingDataAccessor para soportar dot-notation y orden por nombre completo
        this.dataSource.sortingDataAccessor = (item: any, property: string) => {
          if (!item) return '';

          if (property === 'profile.name' || property === 'profile.parentLastName' || property === 'profile.motherLastName' || property === 'profile.church') {
            // manejar propiedades anidadas
            const parts = property.split('.');
            let value: any = item;
            for (const part of parts) {
              value = value ? value[part] : null;
            }
            if (value === null || value === undefined) return '';
            return (typeof value === 'string') ? value.toLowerCase() : value;
          }

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
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
