import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AutheticationService } from 'src/app/authetication.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router:Router,public authService:AutheticationService) {}



  logMeIn(){
    this.router.navigate(['/login']);
  }


  SignUp(){
    this.router.navigate(['/signup']);
  }



  Resetpassword(){
  this.router.navigate(['/reset-password']);}




}
