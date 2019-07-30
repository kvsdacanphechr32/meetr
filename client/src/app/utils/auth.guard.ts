import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    
    const isAuthenticated = this.authService.isAuthenticated.getValue();

    console.log(isAuthenticated)
    if (isAuthenticated) {
      return true;
    }
    
    this.authService.showLoginPrompt();

    return false;
  }
}
