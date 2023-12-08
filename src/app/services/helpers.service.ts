import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private router: Router ) { }

  imagePath(title: string, type: string): string {
    if (title.includes(':')) {
      title = title.split(':')[0];      
      title = title.replace(/[;\-.!? ]/g, ' ');
    }
    return `assets/posters/${type}/${title}.png`;
  }

  details(title: string): void {
    this.router.navigate(['details/', title]);
  }
}
