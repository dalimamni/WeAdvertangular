import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { ScreenshotsComponent } from './screenshots/screenshots.component';
import { RegistreComponent } from './registre/registre.component';
import { DownloadComponent } from './download/download.component';
import { FooterComponent } from './footer/footer.component';
import { TestComponent } from './test/test.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { RegisterAgenciesComponent } from './register-agencies/register-agencies.component';
import { LoginAgenciesComponent } from './login-agencies/login-agencies.component';
import { ProfilAgenciesComponent } from './profil-agencies/profil-agencies.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { DashboardAgenciesComponent } from './dashboard-agencies/dashboard-agencies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EmailAutomobilisteComponent } from './email-automobiliste/email-automobiliste.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FeaturesComponent,
    ScreenshotsComponent,
    RegistreComponent,
    DownloadComponent,
    FooterComponent,
    TestComponent,
    LoginComponent,
    AdminComponent,
    RegisterAgenciesComponent,
    LoginAgenciesComponent,
    ProfilAgenciesComponent,
    CandidatureComponent,
    DashboardAgenciesComponent,
    EmailAutomobilisteComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
