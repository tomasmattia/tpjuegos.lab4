import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from '../../registro/registro.component';
import { LoginComponent } from '../../login/login.component';
import { AnagramaComponent } from '../../anagrama/anagrama.component';
import { HomeComponent } from '../../home/home.component';
import { PiepatiComponent } from '../../piepati/piepati.component';
import { AgiaritComponent } from '../../agiarit/agiarit.component';
import { AdivinaComponent } from '../../adivina/adivina.component';
import { SorpresaComponent } from '../../sorpresa/sorpresa.component';
import { EstadisticaComponent } from '../../estadistica/estadistica.component';
import { AuthService } from '../../servicios/auth.service';


const RUTAS: Routes = [{ path:'',component:RegistroComponent },
 { path:'login',component:LoginComponent },
 { path:'anagrama',component:AnagramaComponent, canActivate:[AuthService] },
 { path:'home',component:HomeComponent, canActivate:[AuthService]  },
 { path:'piepati',component:PiepatiComponent, canActivate:[AuthService]  },
 { path:'agiarit',component:AgiaritComponent, canActivate:[AuthService]  },
 { path:'adivina',component:AdivinaComponent, canActivate:[AuthService]  },
 { path:'sorpresa',component:SorpresaComponent, canActivate:[AuthService]  },
 { path:'estadistica',component:EstadisticaComponent, canActivate:[AuthService]  }];

@NgModule({
  imports: [RouterModule.forRoot(RUTAS)],
  exports: [RouterModule]
})
export class RuteoModule { 

}
