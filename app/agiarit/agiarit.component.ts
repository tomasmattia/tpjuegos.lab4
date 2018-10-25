import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicios/data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-agiarit',
  templateUrl: './agiarit.component.html',
  styleUrls: ['./agiarit.component.css']
})
export class AgiaritComponent implements OnInit {
  opciones=['25*5','50-39','28/4','37+58'];
  resultados=['125','11','7','95'];
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
      this.jugador=('{"correo":"'+this.correo+'","juego":"agilidad","cuanto":"1"}');
    }
    else
    {
      this.jugador=('{"correo":"'+this.correo+'","juego":"agilidad","cuanto":"-1"}');
    }
    console.log(this.jugador);
    this.EnviarEstadistica();
  }

  EnviarEstadistica()
  {
    this.data.Estadistica(this.jugador).subscribe(data=>{console.log(data)}, err=>{console.log(err)});
  }
}
