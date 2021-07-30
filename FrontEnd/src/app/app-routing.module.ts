import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteComponent } from './pages/write/write.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleComponent } from './pages/single/single.component';
import { MyarticlesComponent } from './pages/myarticles/myarticles.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},

  {path:'write', component:WriteComponent},

  {path:'register', component: RegisterComponent},

  {path:'post/:postId', component:SingleComponent},
  {path:'home/?cat=catName', component:HomeComponent},

  {path:'settings', component:SettingsComponent},
  {path:'myarticles', component:MyarticlesComponent},
  {path:'about', component:AboutComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
