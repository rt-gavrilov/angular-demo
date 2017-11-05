import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class IntroTestGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {

    const completed = true;

    if (! completed) {
      this.router.navigate(['/test']);
    } else {
      this.router.navigate(['/sortings']);
    }

    return ! completed;
  }
}
