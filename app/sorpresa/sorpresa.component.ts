import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicios/data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sorpresa',
  templateUrl: './sorpresa.component.html',
  styleUrls: ['./sorpresa.component.css']
})
export class SorpresaComponent implements OnInit {
  opciones=['Francescoli','Riquelme','Cardenas','Bochini'];
  resultados=['river','boca','racing','independiente'];
  numero;
  eleccion;
  eleccionUser;
  estado;
  resultadoMal;
  resultadoBien;
  jugador;
  correo;
  helper=new JwtHelperService();
  constructor(public data:DataService) {
    this.numero=Math.floor(Math.random() * this.opciones.length);
    this.eleccion=this.opciones[this.numero];
    this.estado=true;
    this.resultadoMal=false;
    this.resultadoBien=false;
    this.correo=this.helper.decodeToken(localStorage.getItem('token'));
    this.correo=this.correo.correo;
   }

  ngOnInit() {
  }

  Resolver()
  {
    this.estado=false;
    if(this.eleccionUser==this.resultados[this.numero])
    {
      this.resultadoBien=true;
      console.log('acertaste');
    }
    else
    {
      this.resultadoMal=true;
      console.log('fallaste');
    }
    this.MostrarEstadistica();
  }

  MostrarEstadistica()
  {
    if(this.resultadoBien)
    {
      this.jugador=('{"correo":"'+this.correo+'","juego":"sorpresa","cuanto":"1"}');
    }
    else
    {
      this.jugador=('{"correo":"'+this.correo+'","juego":"sorpresa","cuanto":"-1"}');
    }
    console.log(this.jugador);
    this.EnviarEstadistica();
  }

  EnviarEstadistica()
  {
    this.data.Estadistica(this.jugador).subscribe(data=>{console.log(data)}, err=>{console.log(err)});
  }
}
