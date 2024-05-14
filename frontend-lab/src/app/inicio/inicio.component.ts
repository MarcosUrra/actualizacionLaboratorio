import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
role: string | undefined ;

 
  constructor(private router: Router, public loginService: LoginService ) { }


  ngOnInit(): void {
    this.role = this.loginService.getRole();
  }
}
