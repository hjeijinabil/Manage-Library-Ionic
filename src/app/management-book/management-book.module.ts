import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagementBookPageRoutingModule } from './management-book-routing.module';

import { ManagementBookPage } from './management-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagementBookPageRoutingModule
  ],
  declarations: [ManagementBookPage]
})
export class ManagementBookPageModule {}
