import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicios/data.service';
import { Router } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends RegistroComponent implements OnInit {

  constructor(data:DataService,router:Router) { 
    super(data,router);
  }

  ngOnInit() {
    this.nombre="";
    this.clave="";
  }

  MostrarLogin()
  {
    this.jugador=('{"correo":"'+this.correo+'","clave":"'+this.clave+'"}');
    console.log(this.jugador);
    this.EnviarLogin();
  }

  EnviarLogin()
  {
    this.data.Login(this.jugador).subscribe(data=>{localStorage.setItem('token',data.toString());this.router.navigate(['home']);}, err=>{console.log(err)});
  }
  
  


}
