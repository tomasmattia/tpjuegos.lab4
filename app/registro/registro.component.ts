import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../servicios/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombre;
  clave;
  correo;
  jugador;
  constructor(public data:DataService,public router:Router) {
   }

  ngOnInit() {
    
  }

  MostrarRegistro()
  {
    this.jugador=('{"nombre":"'+this.nombre+'","correo":"'+this.correo+'","clave":"'+this.clave+'"}');
    console.log(this.jugador);
    this.EnviarRegistro();
  }

  EnviarRegistro()
  {
    this.data.Registro(this.jugador).subscribe(data=>{console.log(data)}, err=>{console.log(err)});
  }
  

  IrRegistro()
  {
    this.router.navigate([''])
  }
  
  IrLogin()
  {
    this.router.navigate(['login'])
  }
}
