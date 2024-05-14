import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  hidden: boolean = true; 
  constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (this.router.url === '/' || this.router.url === '/login' || this.router.url === '/portada') {
                this.hidden = true;
            } else {
                this.hidden = false;
            }
        });
    }
}