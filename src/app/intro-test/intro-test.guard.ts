import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class IntroTestGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {

    const completed = false;

    if (! completed) {
      this.router.navigate(['/test']);
    }

    return ! completed;
  }
}
