import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  user:User  =  JSON.parse(sessionStorage.getItem('currentUser'))

  constructor() { }

  ngOnInit() {}

}
