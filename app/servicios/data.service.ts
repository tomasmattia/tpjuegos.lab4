import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const CONFIG=  {headers:new HttpHeaders({token:localStorage.getItem('token')})};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {   }

  Registro(datosJugador)
  {
    return this.http.post('http://localhost/tpjuegos/backend/usuarios/',{json:datosJugador});
  }

  Login(datosJugador)
  {
    return this.http.post('http://localhost/tpjuegos/backend/login/',{json:datosJugador});
  }

  Estadistica(datosEstadistica)
  {
    return this.http.post('http://localhost/tpjuegos/backend/',{json:datosEstadistica});
  }

  Datos()
  {
    return this.http.get('http://localhost/tpjuegos/backend/estadistica/');
  }
 
}
