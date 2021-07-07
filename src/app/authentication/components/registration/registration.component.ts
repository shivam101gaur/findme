import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { HttpUserService } from 'src/app/services/http-user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {


  hide: boolean = true;

  reg_form = new FormGroup({
    user_name: new FormControl(null, [Validators.required]),
    user_password: new FormControl(null, [Validators.required])
  })


  public get user_name() {
    return this.reg_form.get('user_name')
  }

  public get user_password() {
    return this.reg_form.get('user_password')
  }


  constructor(public toastController: ToastController, public httpUserService: HttpUserService) { }

  ngOnInit() { }

  get_errors(error_object) {
    return Object.keys(error_object)
  }

  onSubmit() {
    if (this.reg_form.valid) { this.submit() }
    else {

      this.toast('Invalid Input', JSON.stringify(this.reg_form.errors));

    }

  }

  async toast(header, message) {

    const toast = await this.toastController.create({
      header: header,
      message: message
    })

    toast.present();

  }

  private submit() {

    // 👀 creating new user to post
    let user: User = new User();
    user.name = this.user_name.value;
    user.password = this.user_password.value;

    console.group(['before posting user']);
    console.log(user);
    console.log(JSON.stringify(user));
    console.groupEnd();

    this.post_user(user)  
  }

  post_user(user:User){
    this.httpUserService.postUser(user).subscribe(res => {
      console.group(['after posting user','second label','third label']);
      console.log(res);
      console.log(JSON.stringify(res));
      console.groupEnd();
      this.toast('Congratulations', 'You have been registered');
    }, error => {
      this.toast('Sorry something went wrong', JSON.stringify(error));
    }) 
  }

}
