import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { MusicControllerService } from 'src/app/services/music-controller.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  user:User  =  JSON.parse(sessionStorage.getItem('currentUser'))

  userNameFormControl= new FormControl(this.user.name, [Validators.required])

  userPasswordFormControl= new FormControl(this.user.password, [Validators.required])


  constructor(public musicController:MusicControllerService) { }

  ngOnInit() {}

}
