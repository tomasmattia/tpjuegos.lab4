import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { RuteoModule } from './modulos/ruteo/ruteo.module';
import { DataService } from './servicios/data.service';
import { AuthService } from './servicios/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AnagramaComponent } from './anagrama/anagrama.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PiepatiComponent } from './piepati/piepati.component';
import { AgiaritComponent } from './agiarit/agiarit.component';
import { AdivinaComponent } from './adivina/adivina.component';
import { SorpresaComponent } from './sorpresa/sorpresa.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    AnagramaComponent,
    HomeComponent,
    PiepatiComponent,
    AgiaritComponent,
    AdivinaComponent,
    SorpresaComponent,
    EstadisticaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RuteoModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    MatListModule
  ],
  providers: [DataService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
