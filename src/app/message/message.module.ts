import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { WriteComponent } from './write/write.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule
  ],
  declarations: [WriteComponent]
})
export class MessageModule { }
