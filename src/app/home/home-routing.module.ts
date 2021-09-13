import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutAppComponent } from './components/about-app/about-app.component';
import { ManageWorldComponent } from './components/manage-world/manage-world.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      { path:'',redirectTo:'manage_worlds',pathMatch:"full" },
      { path:'manage_worlds',component:ManageWorldComponent },
      { path:'about_app',component:AboutAppComponent },
      { path:'settings',component:SettingsComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
