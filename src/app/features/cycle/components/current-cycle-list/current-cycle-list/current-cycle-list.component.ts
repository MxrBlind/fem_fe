import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CycleService} from "../../../service/cycle.service";
import {CourseService} from "../../../../course/service/course.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {CourseEditComponent} from "../../../../course/components/course-edit/course-edit.component";
import {CourseNewComponent} from "../../../../course/components/course-new/course-new.component";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-current-cycle-list',
  templateUrl: './current-cycle-list.component.html',
  styleUrl: './current-cycle-list.component.css'
})
export class CurrentCycleListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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

  constructor(courseService: CourseService, cycleService: CycleService, dialog: MatDialog) {
    this.dialog = dialog;
    this.cycleService = cycleService;
    this.courseService = courseService;
  }

  ngOnInit(): void {
    this.getCurrentCycle();
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
        next: (res) => {
          alert('curso eliminado');
          this.getCourseList();
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
          this.getCourseList();
        }
      }
    });
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
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getCourseList() {
    this.courseService.getCourses().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
