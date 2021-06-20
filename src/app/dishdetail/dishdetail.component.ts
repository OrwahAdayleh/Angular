import { Component, OnInit, Input,ViewChild , Inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import { switchMap} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback} from '../shared/feedback';
import {Comment} from '../shared/comment';
import {visibility, flyInOut, expand} from '../animations/app.animation';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations:[ 
    visibility(),
    flyInOut(),
    expand()
  ],
  host:{
    '[@flyInOut]':'true',
    'style':'disblay : block;'
  }

})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective :any;
  @Input()
  dish: Dish;
  visibility='shown';
  errMess: string;
  dishcopy : Dish;
  commentData:Comment;
  dishIds:string[];
  prev:string;
  next:string;
  feedbackForm: FormGroup;
  feedback: Feedback;
  formErrors = {
    'author': '',
    'rating': '',
    'comment': '',
    };
    validationMessages = {
      'author': {
        'required':      'Name is required.',
        'minlength':     'First Name must be at least 2 characters long.',
        'maxlength':     'FirstName cannot be more than 25 characters long.'
      },
      'comment': {
        'required':      'Comment is required.',
        'minlength':     'Last Name must be at least 2 characters long.',
        'maxlength':     'Last Name cannot be more than 25 characters long.'
     },
    };



  constructor(private fb: FormBuilder ,private dishservice: DishService,
     private Location:Location , private route :ActivatedRoute,
      @Inject('BaseURL') public BaseURL:any) { 
    this.createForm();
  }
  createForm() {
    this.feedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2) , Validators.maxLength(25)] ],
      rating :['5'],
      comment:  ['', [Validators.required , Validators.minLength(2) ,Validators.maxLength(25)]],
      date: ['']
    });

    this.feedbackForm.valueChanges.subscribe(data=>this.onValueChanged(data));

    this.onValueChanged();
  }
  onValueChanged(data?:any)
  {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
         (this.formErrors as any)[field]='';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages =(this.validationMessages as any) [field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              (this.formErrors as any)[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  ngOnInit() {
    this.dishservice.getDishIds().subscribe((dishIds)=>this.dishIds=dishIds);
    this.route.params
    .pipe(switchMap(
    (params:Params)=>
    {
    this.visibility ='hidden';
    return this.dishservice.getDish(params['id']);
    }))
    .subscribe(
      dish => 
      { 
        this.dish = dish;
        this.dishcopy=dish; 
        this.setPrevNext(dish.id);
        this.visibility='shown';},
      errmess => this.errMess = <any>errmess);
    ;
    
    }
    setPrevNext(dishId:string)
    {
      const index=this.dishIds.indexOf(dishId);
      this.prev=this.dishIds[(this.dishIds.length+index - 1)% this.dishIds.length];
      this.next=this.dishIds[(this.dishIds.length+index + 1)% this.dishIds.length];
    }
goBack(){
  this.Location.back();
}
onSubmit() {
   this.commentData=this.feedbackForm.value;
   this.commentData.date=(new Date()).toString();
  
  this.dishcopy.comments.push(this.commentData);
  this.dishservice.putDish(this.dishcopy).subscribe(dish=>{
    this.dish=dish;this.dishcopy=this.dish;
  },
  errmess=>{this.dish = null as any ; this.dishcopy = null as any;this.errMess=<any>errmess});
  this.feedback = this.feedbackForm.value;

  this.feedbackForm.reset({
    author: '',
    rating: '',
    comment: '',
   });
  this.feedbackFormDirective.resetForm();

}
}
