import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TitleComponent,SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    TitleComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
