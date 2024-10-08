import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm :FormGroup  ;

  constructor(public router :Router,
    public formBuilder:FormBuilder,
    public loadingCtrl: LoadingController,
    public AuthService:AutheticationService ) { }

  ngOnInit() {
    this.regForm=this.formBuilder.group({
      fullname:['',[Validators.required]],

      email:['',[Validators.required,Validators.email]],

      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }





  get errorControl(){
    return this.regForm?.controls;
  }


async signUp()
{
  const loading = await this.loadingCtrl.create();
  await loading.present();
  if(this.regForm?.valid){
const user = await this.AuthService.registerUser(this.regForm.value.email,this.regForm.value.password)
.then((res)=>{loading.dismiss();
  this.router.navigate(['/home'])
})
.catch((error) =>{ console.log(error);
    loading.dismiss()

  })




  }
}

}


