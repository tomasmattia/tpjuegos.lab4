import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicios/data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-piepati',
  templateUrl: './piepati.component.html',
  styleUrls: ['./piepati.component.css']
})
export class PiepatiComponent implements OnInit {

  opciones=['piedra','papel','tijera'];
  numero;
  eleccion;
  estado:boolean;
  eleccionUser: string;
  seasons: string[] = ['piedra', 'papel', 'tijera'];
  resultadoMal;
  resultadoEmpate;
  resultadoBien;
  jugador;
  correo;
  helper=new JwtHelperService();
  constructor(public data:DataService) {
    this.numero=Math.floor(Math.random() * this.opciones.length);
    this.eleccion=this.opciones[this.numero];
    this.estado=true;
    this.resultadoMal=false;
    this.resultadoEmpate=false;
    this.resultadoBien=false;
    this.correo=this.helper.decodeToken(localStorage.getItem('token'));
    this.correo=this.correo.correo;
   }

  ngOnInit() {
    
  }

  MostrarEstadistica()
  {
    if(this.resultadoBien)
    {
      this.jugador=('{"correo":"'+this.correo+'","juego":"ppt","cuanto":"1"}');
    }
    else
    {
      this.jugador=('{"correo":"'+this.correo+'","juego":"ppt","cuanto":"-1"}');
    }
    console.log(this.jugador);
    this.EnviarEstadistica();
  }

  EnviarEstadistica()
  {
    this.data.Estadistica(this.jugador).subscribe(data=>{console.log(data)}, err=>{console.log(err)});
  }

  Resolver()
  {
    console.log(this.eleccion+' '+this.eleccionUser);
    this.estado=false;
    if(this.eleccion=='piedra')
    {
      if(this.eleccionUser=='papel')
      {
        console.log('ganaste');
        this.resultadoBien=true;
      }
      else
      {
        if(this.eleccionUser=='tijera')
        {
          console.log('perdiste');
          this.resultadoMal=true;
    
        }
        else
        {
          console.log('empate');
          this.resultadoEmpate=true;
        }
      }
    }
    else
    {
      if(this.eleccion=='papel')
      {
        if(this.eleccionUser=='papel')
        {
          console.log('empate');
          this.resultadoEmpate=true;
        }
        else
        {
          if(this.eleccionUser=='tijera')
          {
            console.log('ganaste');
            this.resultadoBien=true;
          }
          else
          {
            console.log('perdiste');
            this.resultadoMal=true;
          }
        }
      }
      else
      {
        if(this.eleccionUser=='papel')
        {
          console.log('perdiste');
          this.resultadoMal=true;
        }
        else
        {
          if(this.eleccionUser=='tijera')
          {
            console.log('empate');
            this.resultadoEmpate=true;
          }
          else
          {
            console.log('ganaste');
            this.resultadoBien=true;
          }
        }
      }
    }
    this.MostrarEstadistica();
  }

}
