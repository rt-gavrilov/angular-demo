import {Injectable} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';

@Injectable()
export class IntroTestGuard implements CanActivate {

  public static readonly localStorageKey = 'test-completed';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async canActivate() {

    const completed = localStorage.getItem(IntroTestGuard.localStorageKey) === 'true';

    if (! completed) {
      this.router.navigate(['/test'], {relativeTo: this.route});
      return false;
    }

    return true;
  }
}
