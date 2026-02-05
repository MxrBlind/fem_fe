import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {SubjectService} from "../../service/subject-service";
import {MatDialog} from "@angular/material/dialog";
import {SubjectEditComponent} from "../subject-edit/subject-edit.component";
import {SubjectNewComponent} from "../subject-new/subject-new/subject-new.component";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subjectService: SubjectService;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'description',
    'category.title',
    'level.title',
    'action'
  ];
  dialog: any;

  constructor(subjectService: SubjectService, dialog: MatDialog) {
    this.dialog = dialog;
    this.subjectService = subjectService;
  }

  ngOnInit(): void {
    this.getSubjectList();
  }

  openNewSubjectDialog() {
    const dialogRef = this.dialog.open(SubjectNewComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getSubjectList();
        }
      }
    });
  }

  openEditSubjectDialog(data: any) {
    const dialogRef = this.dialog.open(SubjectEditComponent, {data});

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getSubjectList();
        }
      }
    });
  }

  deleteSubject(id: number) {
    let confirm = window.confirm("¿Estas seguro de borrar esta materia?");
    if (confirm) {
      this.subjectService.deleteSubject(id).subscribe({
        next: (res) => {
          alert('Materia eliminada');
          this.getSubjectList();
        },
        error: (err) => {
          console.log(err);
        }
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

  private getSubjectList() {
    this.subjectService.getSubjects().subscribe({
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
