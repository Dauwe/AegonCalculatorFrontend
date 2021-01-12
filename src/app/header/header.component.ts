import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  links: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.links = [
      {naam: 'Home', redirectUrl: '/home', icon: 'assets/images/house.png' },
      {naam: 'Calculator', redirectUrl: '/calculator', icon: 'assets/images/calc.png'}
    ];
  }

  routeTo(location: any): any {
    this.router.navigate([location]);
  }
}
