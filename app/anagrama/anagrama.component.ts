import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicios/data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent  implements OnInit {

  palabras=['brasil','china','nepal','ecuador','palestina'];
  anagramas=['silbar','hinca','panel','acuerdo','penalista'];
  numero;
  random;
  palabra;
  estado;
  resultadoMal;
  resultadoBien;
  jugador;
  correo;
  helper=new JwtHelperService();
  constructor(public data:DataService) {
    this.numero=Math.floor(Math.random() * this.anagramas.length);
    this.random = this.anagramas[this.numero];
    console.log(this.random);
    console.log(this.numero);
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
    if(this.palabra==this.palabras[this.numero])
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
      this.jugador=('{"correo":"'+this.correo+'","juego":"anagrama","cuanto":"1"}');
    }
    else
    {
      this.jugador=('{"correo":"'+this.correo+'","juego":"anagrama","cuanto":"-1"}');
    }
    console.log(this.jugador);
    this.EnviarEstadistica();
  }

  EnviarEstadistica()
  {
    this.data.Estadistica(this.jugador).subscribe(data=>{console.log(data)}, err=>{console.log(err)});
  }

}
