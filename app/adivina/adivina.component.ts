import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicios/data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-adivina',
  templateUrl: './adivina.component.html',
  styleUrls: ['./adivina.component.css']
})
export class AdivinaComponent implements OnInit {
  numero;
  eleccionUser;
  estado;
  resultadoMal;
  resultadoBien;
  jugador;
  correo;
  helper=new JwtHelperService();
  constructor(public data:DataService) {
    this.numero=Math.floor(Math.random() * 50) + 1;
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
    if(this.eleccionUser==this.numero)
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
      this.jugador=('{"correo":"'+this.correo+'","juego":"adivina","cuanto":"1"}');
    }
    else
    {
      this.jugador=('{"correo":"'+this.correo+'","juego":"adivina","cuanto":"-1"}');
    }
    console.log(this.jugador);
    this.EnviarEstadistica();
  }

  EnviarEstadistica()
  {
    this.data.Estadistica(this.jugador).subscribe(data=>{console.log(data)}, err=>{console.log(err)});
  }
}
