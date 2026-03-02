import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {GradeService} from "../../service/grade.service";
import {ProfileService} from '../../../profile/service/profile.service';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrl: './grade-list.component.css'
})
export class GradeListComponent implements OnInit, AfterViewInit {
  paginator!: MatPaginator;
  sort!: MatSort;
  gradeService: GradeService;
  profileService!: ProfileService;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'studentName',
    'courseName',
    'cycleName',
    'startDate',
    'grade',
    'action'
  ];

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

  constructor(gradeService: GradeService, profileService: ProfileService) {
    this.gradeService = gradeService;
    this.profileService = profileService;
  }

  ngOnInit(): void {
    this.getGrades();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    }
  }

  downloadCertificate(data: any) {
    if (!data) {
      alert('Datos inválidos para descargar el certificado.');
      return;
    }

    const enrollmentId = data.enrollmentId ?? data.enrollmentID ?? data.id;
    const studentId = data.studentId ?? data.studentID ?? data.userId;

    if (!enrollmentId || !studentId) {
      alert('Faltan enrollmentId o studentId en los datos proporcionados.');
      return;
    }

    this.gradeService.downloadCertificate(enrollmentId, studentId).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificate_${enrollmentId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        console.error('Error descargando el certificado', err);
        alert('Error descargando el certificado.');
      }
    });
  }

  downloadGradeReport() {
    // Obtener el studentId desde el observable del ProfileService
    this.profileService.getCurrentUserId().subscribe({
      next: (studentId) => {
        if (!studentId) {
          alert('Error con el studentId actual. No se pudo descargar el reporte de calificaciones.');
          return;
        }

        // Llamar al servicio que descarga el reporte (asegúrate que el método exista en GradeService)
        this.gradeService.downloadGradeReport(studentId).subscribe({
          next: (blob: Blob) => {
            // Crear URL y forzar descarga
            const url = window.URL.createObjectURL(blob as Blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `grade-report_${studentId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
          },
          error: (err: any) => {
            console.error('Error descargando el reporte', err);
            alert('Error descargando el reporte.');
          }
        });
      },
      error: (err) => {
        console.error('Error obteniendo el studentId', err);
        alert('No se pudo obtener el usuario actual.');
      }
    });
  }

  private getGrades() {
    // Obtener userId mediante ProfileService
    this.profileService.getCurrentUserId().subscribe({
      next: (userId) => {
        this.gradeService.getGradesByUser(userId).subscribe({
          next: (data) => {
            this.dataSource = new MatTableDataSource(data || []);

            // filterPredicate para soportar búsqueda en campos simples
            this.dataSource.filterPredicate = (item: any, filter: string) => {
              const search = (filter || '').trim().toLowerCase();
              if (!search) return true;

              const enrollmentId = (item.enrollmentId ?? '').toString().toLowerCase();
              const studentName = (item.studentName ?? '').toString().toLowerCase();
              const courseName = (item.courseName ?? '').toString().toLowerCase();
              const grade = (item.grade ?? '').toString().toLowerCase();
              const startDate = (item.startDate ?? '').toString().toLowerCase();

              const combined = `${enrollmentId} ${studentName} ${courseName} ${grade} ${startDate}`;
              return combined.includes(search);
            };

            this.dataSource.sortingDataAccessor = (item: any, property: string) => {
              const value = item[property];
              if (value === null || value === undefined) return '';
              return (typeof value === 'string') ? value.toLowerCase() : value;
            };

            if (this.paginator) this.dataSource.paginator = this.paginator;
            if (this.sort) this.dataSource.sort = this.sort;
          },
          error: (err) => {
            console.error(err);
          }
        });
      },
      error: (err) => {
        console.error('Unable to get current user id', err);
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

}
