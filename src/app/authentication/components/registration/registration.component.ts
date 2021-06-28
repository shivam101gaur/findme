import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  
  hide:boolean=true;

  reg_form = new FormGroup({
    user_name:new FormControl(null,[Validators.required]),
    user_password:new  FormControl(null,[Validators.required])
  })
  

  public get user_name()  {
    return this.reg_form.get('user_name')
  }
  
  public get user_password()  {
    return this.reg_form.get('user_password')
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
