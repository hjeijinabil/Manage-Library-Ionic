import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
loginForm : FormGroup
regForm :FormGroup
  user = {
    email :'',
    password:''
  }



  constructor(private router:Router,public loadingCtrl: LoadingController,public AuthService:AutheticationService,public formBuilder:FormBuilder)

    { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({

      email:['',[Validators.required,Validators.email]],

      password:['',[Validators.required]]
    })
  }



  get errorControle(){
    return this.loginForm?.controls;
  }





async login()
{

  const loading = await this.loadingCtrl.create();

  if(this.loginForm?.valid)  {
    await loading.present();
const user = await this.AuthService.loginUser(this.loginForm.value.email,this.loginForm.value.password)

.then((res)=>{
  loading.dismiss();
  alert("success")
  loading.dismiss()
  this.router.navigate(['/management-book'])
})
.catch((error) =>{
  loading.dismiss();
  alert("Error to log in please try again")
  loading.dismiss()
  this.router.navigate(['/home'])

  })

  }
}
}
