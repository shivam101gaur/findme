import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { User } from 'src/app/models/user.model';
import { HttpUserService } from 'src/app/services/http-user.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  login_form = new FormGroup({
    user_name: new FormControl(null, [Validators.required]),
    user_password: new FormControl(null, [Validators.required])
  })


  public get user_name() {
    return this.login_form.get('user_name')
  }

  public get user_password() {
    return this.login_form.get('user_password')
  }

  constructor(public toaster:ToasterService, public httpUserService: HttpUserService, private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit() { }

  get_errors(error_object) {
    return Object.keys(error_object)
  }

  onSubmit() {

  }

  private submit() {

    // 👀 creating new user to post
    let user: User = new User();
    user.name = this.user_name.value;
    user.password = this.user_password.value;




  }



}
