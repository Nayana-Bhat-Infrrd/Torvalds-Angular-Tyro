import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit, OnChanges {
  @Input() displayMessage: string;
  @Input() displayBookMark: boolean;


  @Input() buttonName: string;
  @Input() disableButton: boolean;

  constructor() {

  }

  ngOnInit(): void {
    console.log("disableButton : " + this.disableButton);


  }

  ngOnChanges(changes) {
    console.log("Changes : " + JSON.stringify(changes));

  }

  @Output() childEvent = new EventEmitter();
  on() {
    this.childEvent.emit();
  }
}
