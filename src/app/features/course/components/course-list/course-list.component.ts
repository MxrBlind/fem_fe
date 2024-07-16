import {Component, OnInit, ViewChild} from '@angular/core';
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
export class CourseListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  courseService: CourseService;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'description',
    'credits',
    'fullName',
    'category.title',
    'action'
  ];
  dialog: any;

  constructor(courseService: CourseService, dialog: MatDialog) {
    this.dialog = dialog;
    this.courseService = courseService;
  }

  ngOnInit(): void {
    this.getCourseList();
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
    const dialogRef = this.dialog.open(CourseEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getCourseList();
        }
      }
    });
  }

  deleteCourse(id: number) {
    let confirm = window.confirm("¿Estas seguro de borrar este estudiante?");
    if (confirm) {
      this.courseService.deleteCourse(id).subscribe({
        next: (res) => {
          alert('Estudiante eliminado');
          this.getCourseList();
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

  private getCourseList() {
    this.courseService.getCourses().subscribe({
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
