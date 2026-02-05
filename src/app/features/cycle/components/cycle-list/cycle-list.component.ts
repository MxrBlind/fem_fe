import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
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
export class CycleListComponent implements OnInit, AfterViewInit {

  // usar setters para asegurar asignación cuando existen
  paginator!: MatPaginator;
  sort!: MatSort;
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

  constructor(cycleService: CycleService, dialog: MatDialog) {
    this.dialog = dialog;
    this.cycleService = cycleService;
  }

  ngOnInit(): void {
    this.getCycleList();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    }
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
        next: () => {
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

  private getCycleList() {
    this.cycleService.getAllCycles().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);

        // filterPredicate para propiedades anidadas y nombre completo del principal
        this.dataSource.filterPredicate = (item: any, filter: string) => {
          const search = (filter || '').trim().toLowerCase();
          if (!search) return true;

          const id = (item.id ?? '').toString().toLowerCase();
          const description = (item.description ?? '').toString().toLowerCase();
          const startDate = (item.startDate ?? '').toString().toLowerCase();
          const endDate = (item.endDate ?? '').toString().toLowerCase();
          const principalName = (item.principal?.profile?.name ?? '').toString().toLowerCase();
          const principalParentLast = (item.principal?.profile?.parentLastName ?? '').toString().toLowerCase();
          const principalFull = (principalName + ' ' + principalParentLast).trim().toLowerCase();
          const current = (item.current ? 'true' : 'false');

          const combined = `${id} ${description} ${startDate} ${endDate} ${principalFull} ${current}`;
          return combined.includes(search);
        };

        // sortingDataAccessor: soporta propiedades con punto y columnas calculadas
        this.dataSource.sortingDataAccessor = (item: any, property: string) => {
          if (!item) return '';

          if (property === 'principal.fullName') {
            const name = item.principal?.profile?.name ?? '';
            const parentLast = item.principal?.profile?.parentLastName ?? '';
            return (name + ' ' + parentLast).trim().toLowerCase();
          }

          if (property === 'startDate' || property === 'endDate') {
            const d = item[property];
            const date = d ? new Date(d) : null;
            return date ? date.getTime() : 0;
          }

          if (property === 'current') {
            return item.current ? 1 : 0;
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
