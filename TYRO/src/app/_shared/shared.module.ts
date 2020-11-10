import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [TitleComponent,SidebarComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
