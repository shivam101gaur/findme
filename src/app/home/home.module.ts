import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ManageWorldComponent } from './components/manage-world/manage-world.component';
import { CreateWorldComponent } from './components/create-world/create-world.component';
import { AboutAppComponent } from './components/about-app/about-app.component';
import { UpdateWorldComponent } from './components/update-world/update-world.component';
import { JoinWorldComponent } from './components/join-world/join-world.component';
import { ViewMembersComponent } from './components/view-members/view-members.component';
import { WorldChatComponent } from './components/world-chat/world-chat.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AvatarComponent } from './components/avatar/avatar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AngularMaterialModule
  ],
  declarations: [HomePage,ManageWorldComponent,CreateWorldComponent,AboutAppComponent,UpdateWorldComponent,JoinWorldComponent,ViewMembersComponent,WorldChatComponent,SettingsComponent,AvatarComponent]
})
export class HomePageModule {}
