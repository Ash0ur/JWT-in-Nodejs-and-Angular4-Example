import { Injectable,OnInit } from '@angular/core';
import { CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuardService implements CanActivate{
    constructor(private _http:HttpClient,private router:Router){}

    async canActivate(route:ActivatedRouteSnapshot){
        console.log('AuthGuard Can Activate called');

            var response = await this._http.get('/dashboard').toPromise();

            if(response["result"] == "token verified"){
                console.log('token verified');
                return true;
            }else{
                console.log('invalid token');
                this.router.navigate(['/']);
                return false; 
            }

    }

}
