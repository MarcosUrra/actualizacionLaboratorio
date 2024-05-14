import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent {

  constructor (private router: Router){}

  ingresar(){
    this.router.navigate(['/login'])
  }

}