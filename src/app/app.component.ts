import { Component} from '@angular/core';

// import {
//   Overlay,
//   // OverlayOrigin,
//   OverlayConfig,
//   OverlayRef
// } from "@angular/cdk/overlay";
import { SidebarComponent } from './_shared/sidebar/sidebar.component';
// import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    // public overlay: Overlay,
    //public viewContainerRef: ViewContainerRef
    )
    {}
  title = 'TYROversion1';
}
