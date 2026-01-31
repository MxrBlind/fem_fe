import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
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
export class EnrollmentListComponent implements OnInit, AfterViewInit {

  currentRole: string = "INVALID";
  // Usar setters en los ViewChild para asignar paginator y sort cuando estén disponibles
  paginator!: MatPaginator;
  sort!: MatSort;

  enrollmentService: EnrollmentService;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'fullName',
    'student.profile.church',
    'course.subject.description',
    'course.subject.category.title',
    'action'
  ];
  dialog: any;
  currentCycleName: any;
  currentCycleId: number = 0;

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

  ngAfterViewInit(): void {
    if (this.dataSource) {
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
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
        next: () => {
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
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getEnrollmentList() {
    this.enrollmentService.getEnrollments().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);

        // filterPredicate personalizado para soportar búsqueda en propiedades anidadas y en fullname
        this.dataSource.filterPredicate = (item: any, filter: string) => {
          const search = (filter || '').trim().toLowerCase();
          if (!search) return true;

          const id = (item.id ?? '').toString().toLowerCase();
          const name = item.student?.profile?.name ?? '';
          const parentLast = item.student?.profile?.parentLastName ?? '';
          const fullName = (name + ' ' + parentLast).trim().toLowerCase();
          const church = (item.student?.profile?.church ?? '').toString().toLowerCase();
          const courseDesc = (item.course?.subject?.description ?? '').toString().toLowerCase();
          const category = (item.course?.subject?.category?.title ?? '').toString().toLowerCase();

          const combined = `${id} ${fullName} ${church} ${courseDesc} ${category}`;
          return combined.includes(search);
        };

        // sortingDataAccessor soporta propiedades anidadas (dot notation)
        // y columnas calculadas como 'fullName'
        this.dataSource.sortingDataAccessor = (item: any, property: string) => {
          if (!item) { return ''; }

          // columna calculada fullName
          if (property === 'fullName') {
            const name = item.student?.profile?.name ?? '';
            const parentLast = item.student?.profile?.parentLastName ?? '';
            return (name + ' ' + parentLast).trim().toLowerCase();
          }

          // soporte para propiedades con punto: e.g. 'student.profile.church' or 'course.subject.description'
          if (property.indexOf('.') > -1) {
            const parts = property.split('.');
            let value: any = item;
            for (const part of parts) {
              value = value ? value[part] : null;
            }
            if (value === null || value === undefined) return '';
            return (typeof value === 'string') ? value.toLowerCase() : value;
          }

          // fallback: propiedades directas
          const direct = item[property];
          return (direct === null || direct === undefined) ? '' : (typeof direct === 'string' ? direct.toLowerCase() : direct);
        };

        // asignar paginador y sort si ya están disponibles
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
