import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementBookPage } from './management-book.page';

const routes: Routes = [
  {
    path: '',
    component: ManagementBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementBookPageRoutingModule {}
