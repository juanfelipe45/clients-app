import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'core', pathMatch: 'full' },
  {
    path: 'core',
    children: [
      { path: 'client', loadChildren: () => import('./client/client.module').then((m) => m.ClientModule) },
      { path: '**', redirectTo: 'client', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
