import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NewpostService } from 'src/app/_shared/_services/newpost.service';

@Component({
  selector: 'app-add-topics',
  templateUrl: './add-topics.component.html',
  styleUrls: ['./add-topics.component.css']
})
export class AddTopicsComponent implements OnInit {  
  listOfTopics: Array<any> = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  TopicCtrl = new FormControl();
  filteredTopics: Observable<string[]>;
  Topics: string[] = [];
  allTopics: string[] = [];
  allIds: string[] = [];
  i: any;
  j: any;
  filteredIds:Array<any>=[];
  @ViewChild('TopicInput') TopicInput: ElementRef<any>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Input() title:string;
  @Input() content:string;
   ngOnInit(): void {
    this.newpostService.getTopics()
      .subscribe
      (
        data => {
          this.listOfTopics = data;
          data.forEach(element=>{
            this.allTopics.push(element.name)
            this.allIds.push(element.id)
          })
        },
        error => {
          console.log("error : " + error);
        }
      )
     
    
  }
 

  constructor(
    
    private newpostService: NewpostService,
    ) {


    this.filteredTopics = this.TopicCtrl.valueChanges.pipe(
      startWith(''),
      map((Topic: string | null) => Topic ? this._filter(Topic) : this.allTopics.slice()));
   
  }

  
  
  add(event: MatChipInputEvent): void {

    // Add Topic only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our Topic

      if ((value || '').trim() && this.Topics.length < 1) {
        let index = this.Topics.indexOf(value.trim())
        if (index == -1) {
          this.Topics.push(value.trim());
        }
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.TopicCtrl.setValue(null);
    }

  }
  remove(value: string): void {
    const index = this.Topics.indexOf(value);
    if (index >= 0) {
      this.Topics.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.Topics.length < 5 && !this.Topics.includes(event.option.viewValue)) {
      this.Topics.push(event.option.viewValue);
    }
    this.TopicInput.nativeElement.value = '';
    this.TopicCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTopics.filter(Topic => Topic.toLowerCase().indexOf(filterValue) === 0);
  }
  
  getId()
  { 
      for (this.j = 0; this.j < this.Topics.length; this.j++) {
        for (this.i = 0; this.i < this.allTopics.length; this.i++) {
          if ((this.Topics[this.j]) == (this.allTopics[this.i])) {
            this.filteredIds[this.j] = this.allIds[this.i];
          }
        }
        this.i = 0;
      }
      this.newpostService.addPost(this.title,this.content,this.filteredIds);
      this.filteredIds.length = 0;
      this.listOfTopics.length = 0;
      this.allTopics.length = 0;
  }  
}
