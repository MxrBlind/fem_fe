import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CycleService} from "../../service/cycle.service";
import {CourseService} from "../../../course/service/course.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {CourseEditComponent} from "../../../course/components/course-edit/course-edit.component";
import {CourseNewComponent} from "../../../course/components/course-new/course-new.component";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-current-cycle-list',
  templateUrl: './current-cycle-list.component.html',
  styleUrl: './current-cycle-list.component.css'
})
export class CurrentCycleListComponent implements OnInit, AfterViewInit {

  // Usar setters en los ViewChild para asignar paginator y sort cuando estén disponibles
  paginator!: MatPaginator;
  sort!: MatSort;
  cycleService: CycleService;
  courseService: CourseService;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'subject.title',
    'credits',
    'teacher.fullName',
    'category.title',
    'level.title',
    'action'
  ];
  dialog: any;
  cycleName: String = "";
  cycleId: number = 0;

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

  constructor(courseService: CourseService, cycleService: CycleService, dialog: MatDialog) {
    this.dialog = dialog;
    this.cycleService = cycleService;
    this.courseService = courseService;
  }

  ngOnInit(): void {
    this.getCurrentCycle();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    }
  }

  openEditCourseDialog(data: any) {
    const dialogRef = this.dialog.open(CourseEditComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getCurrentCycle();
        }
      }
    });
  }

  deleteCourse(id: number) {
    let confirm = window.confirm("¿Estas seguro de borrar este curso?");
    if (confirm) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          alert('curso eliminado');
          this.getCurrentCycle();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openNewCourseDialog() {
    const dialogRef = this.dialog.open(CourseNewComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getCurrentCycle();
        }
      }
    });
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

  private getCurrentCycle() {
    this.cycleService.getCurrentCycle()
      .pipe(
        switchMap(cycle => {
          this.cycleName = cycle.description;
          this.cycleId = cycle.id;
          return this.cycleService.getCoursesByCycle(this.cycleId);
        })
      ).subscribe({
      next: (courses) => {
        this.dataSource = new MatTableDataSource(courses);

        // filterPredicate personalizado para soportar búsqueda en propiedades anidadas y nombre del profesor
        this.dataSource.filterPredicate = (item: any, filter: string) => {
          const search = (filter || '').trim().toLowerCase();
          if (!search) return true;

          const id = (item.id ?? '').toString().toLowerCase();
          const subject = (item.subject?.title ?? '').toString().toLowerCase();
          const credits = (item.credits ?? '').toString().toLowerCase();
          const teacherName = (item.teacher?.profile?.name ?? '').toString().toLowerCase();
          const teacherParentLast = (item.teacher?.profile?.parentLastName ?? '').toString().toLowerCase();
          const teacherFull = (teacherName + ' ' + teacherParentLast).trim().toLowerCase();
          const category = (item.subject?.category?.title ?? '').toString().toLowerCase();
          const level = (item.subject?.level?.title ?? '').toString().toLowerCase();

          const combined = `${id} ${subject} ${credits} ${teacherFull} ${category} ${level}`;
          return combined.includes(search);
        };

        // sortingDataAccessor soporta propiedades anidadas (dot notation)
        // y columnas calculadas como 'teacher.fullName'
        this.dataSource.sortingDataAccessor = (item: any, property: string) => {
          if (!item) { return ''; }

          // columna calculada teacher.fullName
          if (property === 'teacher.fullName') {
            const name = item.teacher?.profile?.name ?? '';
            const parentLast = item.teacher?.profile?.parentLastName ?? '';
            return (name + ' ' + parentLast).trim().toLowerCase();
          }

          // soporte para propiedades con punto: e.g. 'subject.title' or 'subject.category.title'
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
      error: (error) => {
        console.log(error);
      }
    });
  }

}
