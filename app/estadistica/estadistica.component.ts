import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicios/data.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {
  users;
  constructor(public data:DataService) { }

  ngOnInit() {

    this.data.Datos().subscribe(data=>{this.users=data}, err=>{console.log(err)});

  }

}
