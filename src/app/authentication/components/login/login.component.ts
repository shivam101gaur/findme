import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide:boolean=true;

  login_form = new FormGroup({
    user_name:new FormControl(null,[Validators.required]),
    user_password:new  FormControl(null,[Validators.required])
  })
  

  public get user_name()  {
    return this.login_form.get('user_name')
  }
  
  public get user_password()  {
    return this.login_form.get('user_password')
  }
  

  constructor() { }

  ngOnInit() {}

  get_errors(error_object)
  {
    return Object.keys(error_object) 
  }

  onSubmit(){
    
  }

}
