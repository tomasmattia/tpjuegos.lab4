import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  helper=new JwtHelperService();
  datosJugador;
  constructor(private router:Router) { }

  ngOnInit() {
    this.datosJugador=this.helper.decodeToken(localStorage.getItem('token'));
    console.log(this.datosJugador);
  }

  Deslogearse()
  {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  
}
