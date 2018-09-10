import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriteComponent } from './write/write.component';

const routes: Routes = [
  { path: 'new', component: WriteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
