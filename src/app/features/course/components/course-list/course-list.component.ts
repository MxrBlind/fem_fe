import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CourseService} from "../../service/course.service";
import {MatDialog} from "@angular/material/dialog";
import {CourseNewComponent} from "../course-new/course-new.component";
import {CourseEditComponent} from "../course-edit/course-edit.component";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit, AfterViewInit {

  paginator!: MatPaginator;
  sort!: MatSort;
  courseService: CourseService;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'description',
    'credits',
    'fullName',
    'category.title',
    'level.title',
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

  constructor(courseService: CourseService, dialog: MatDialog) {
    this.dialog = dialog;
    this.courseService = courseService;
  }

  ngOnInit(): void {
    this.getCourseList();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    }
  }

  openNewCourseDialog() {
    const dialogRef = this.dialog.open(CourseNewComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getCourseList();
        }
      }
    });
  }

  openEditCourseDialog(data: any) {
    const dialogRef = this.dialog.open(CourseEditComponent, {data});

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getCourseList();
        }
      }
    });
  }

  deleteCourse(id: number) {
    let confirm = window.confirm("¿Estas seguro de borrar este curso?");
    if (confirm) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          alert('Curso eliminado');
          this.getCourseList();
        },
        error: (err) => {
          console.log(err);
        }
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

  private getCourseList() {
    this.courseService.getCourses().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);

        // filterPredicate para buscar en propiedades anidadas y nombre completo del profesor
        this.dataSource.filterPredicate = (item: any, filter: string) => {
          const search = (filter || '').trim().toLowerCase();
          if (!search) return true;

          const id = (item.id ?? '').toString().toLowerCase();
          const description = (item.description ?? '').toString().toLowerCase();
          const credits = (item.credits ?? '').toString().toLowerCase();
          const teacherName = (item.teacher?.profile?.name ?? '').toString().toLowerCase();
          const teacherParentLast = (item.teacher?.profile?.parentLastName ?? '').toString().toLowerCase();
          const teacherFull = (teacherName + ' ' + teacherParentLast).trim().toLowerCase();
          const category = (item.category?.title ?? '').toString().toLowerCase();
          const level = (item.level?.title ?? '').toString().toLowerCase();

          const combined = `${id} ${description} ${credits} ${teacherFull} ${category} ${level}`;
          return combined.includes(search);
        };

        // sortingDataAccessor soporta 'fullName' y propiedades con punto
        this.dataSource.sortingDataAccessor = (item: any, property: string) => {
          if (!item) return '';

          if (property === 'fullName') {
            const name = item.teacher?.profile?.name ?? '';
            const parentLast = item.teacher?.profile?.parentLastName ?? '';
            return (name + ' ' + parentLast).trim().toLowerCase();
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
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
