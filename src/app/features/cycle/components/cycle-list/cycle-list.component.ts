import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CycleService} from "../../service/cycle.service";
import {MatDialog} from "@angular/material/dialog";
import {CycleEditComponent} from "../cycle-edit/cycle-edit/cycle-edit.component";
import {CycleNewComponent} from "../cycle-new/cycle-new/cycle-new.component";

@Component({
  selector: 'app-cycle-list',
  templateUrl: './cycle-list.component.html',
  styleUrl: './cycle-list.component.css'
})
export class CycleListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cycleService: CycleService;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'description',
    'startDate',
    'endDate',
    'principal.fullName',
    'current',
    'action'
  ];
  dialog: any;

  constructor(cycleService: CycleService, dialog: MatDialog) {
    this.dialog = dialog;
    this.cycleService = cycleService;
  }

  ngOnInit(): void {
    this.getCycleList();
  }

  openEditCycleDialog(data: any) {
    const dialogRef = this.dialog.open(CycleEditComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getCycleList();
        }
      }
    });
  }

  deleteCycle(id: number) {
    let confirm = window.confirm("¿Estás seguro de borrar este ciclo?");
    if (confirm) {
      this.cycleService.deleteCycle(id).subscribe({
        next: (res) => {
          alert('ciclo eliminado');
          this.getCycleList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openNewCycleDialog() {
    const dialogRef = this.dialog.open(CycleNewComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getCycleList();
        }
      }
    });
  }

  private getCycleList() {
    this.cycleService.getAllCycles().subscribe({
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
