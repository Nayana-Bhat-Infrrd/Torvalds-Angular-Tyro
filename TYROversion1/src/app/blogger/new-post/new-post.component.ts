import { NewpostService } from 'src/app/_shared/_services/newpost.service';
import {FormControl,FormGroup, Validators,FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component,OnInit, ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {ToastrService} from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{

  listOfTopics:Array<any>=[];
  Published: boolean = false;
  submitted = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  TopicCtrl = new FormControl();
  filteredTopics: Observable<string[]>;
  Topics: string[] = [];
  allTopics: string[] = [];
  allIds:string[]=[];
  i:any;
  j:any;
  FilteredIds:Array<any>=[];
  @ViewChild('TopicInput')TopicInput: ElementRef<any>;
  @ViewChild('auto')matAutocomplete: MatAutocomplete;
  
 
  ngOnInit():void{
    
 
    this.newpostService.getTopics()
    .subscribe(
    data=>{
      this.listOfTopics = data;
      
    },
    error=>{
      console.log("error : " + error);
    })
                     
  }  


constructor(private fb: FormBuilder,private newpostService: NewpostService,public toastr:ToastrService) {
    
  this.filteredTopics = this.TopicCtrl.valueChanges.pipe(
      startWith(''),
      map((Topic: string | null) => Topic ? this._filter(Topic) : this.allTopics.slice()));
      
  }


  publishForm = this.fb.group({
    Title: new FormControl('',[Validators.required,Validators.minLength(5)]) ,
    Content: new FormControl('', [Validators.required,Validators.minLength(10)]),
    
  });
  
  showSuccess(){
    this.toastr.success('Post Submission',' Congrats...Your Post has been added successfully!!!',{
      positionClass:'toast-top-left',
      timeOut:1500,
    })
   
  
  }
   

  showWarning(){
    this.toastr.error('Post Error','The title and content are required and title must be more than 5 and content must be more than 10 characters'),{
      positionClass:'toast-top-center',
      timeOut:1500,
    }
  }

  
  add(event: MatChipInputEvent): void {
    // Add Topic only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      
      // Add our Topic
      if ((value || '').trim() && this.Topics.length < 1) {
        let index =   this.Topics.indexOf(value.trim())
        if(index == -1)
          this.Topics.push(value.trim());
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

  

get f() {
     return this.publishForm.controls;
}
onSubmit()
{
  alert("Enter topic and description");

}

on()
{
  $("#overlay").css("display","block");
  for(this.i=0;this.i<this.listOfTopics.length;this.i++)
  {
        this.allTopics[this.i] = this.listOfTopics[this.i].name; 
        this.allIds[this.i] = this.listOfTopics[this.i].id; 
            
  }

}
off()
{  
  $("#overlay").css("display","none");
}

change()
{
  $("#title").css("color","#333333");
  $("#title").css("font-weight","bold");
  $("#title").css("font-size","24px");
  $("#title").css("font-family","Open-sans,sans-serif;");
  // $("#title").removeAttr('placeholder');
}

addPost(title:string,Content:string){
    console.log(title+" "+Content);
    console.log(this.listOfTopics);
    console.log(this.Topics);
    for(this.j=0;this.j<this.Topics.length;this.j++)
      {
             for(this.i=0;this.i<this.allTopics.length;this.i++)
            {        
                   if((this.Topics[this.j])==(this.allTopics[this.i]))
                   {      console.log(this.i);
                          this.FilteredIds[this.j]=this.allIds[this.i];
                   }
            }
            this.i=0;
      }
      console.log(this.FilteredIds);
          
       this.newpostService.addPost(title,Content,this.FilteredIds); 
       this.showSuccess();
       this.FilteredIds.length=0; 
       this.listOfTopics.length=0;
       this.allTopics.length=0;

   }
   
}

