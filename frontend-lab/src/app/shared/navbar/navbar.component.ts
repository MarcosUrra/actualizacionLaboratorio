import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReportesComponent } from 'src/app/dialogos/reportes/reportes.component';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginService } from 'src/app/login/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [LoginComponent]
})
export class NavbarComponent implements OnInit {
    hidden: boolean = true;
   
    constructor(private router: Router, public loginService: LoginService, private dialog: MatDialog,) {

     }


    ngOnInit() {

        this.router.events.subscribe((event) => {
            if (this.router.url === '/' || this.router.url === '/login' || this.router.url === '/portada') {
                this.hidden = true;
            } else {
                this.hidden = false;
            }
        });
    }

    clearRole(): void {
        localStorage.setItem('userRole', '');
        this.router.navigateByUrl('/portada')
    }

    GenerarReporteDiario(): void {
    
        const dialogRef = this.dialog.open(ReportesComponent, {
          width: "40%",
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 'guardado') {
          }
        });
      }
}


