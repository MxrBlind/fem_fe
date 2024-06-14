import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './features/login/components/login/login.component';
import {SharedModule} from './shared/shared.module';
import {
  DashboardCardComponent
} from './features/dashboard/components/dashboard-card/dashboard-card.component';
import {DashboardComponent} from './features/dashboard/components/dashboard/dashboard.component';
import { NavbarComponent } from './features/navbar/navbar/navbar.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { StudentListComponent } from './features/student/components/student-list/student-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardCardComponent,
    DashboardComponent,
    NavbarComponent,
    StudentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
