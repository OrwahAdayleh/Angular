import { Component, OnInit, Input,ViewChild } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import { switchMap} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback} from '../shared/feedback';
import {Comment} from '../shared/comment';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective :any;
  @Input()
  dish: Dish;
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



  constructor(private fb: FormBuilder ,private dishservice: DishService, private Location:Location , private route :ActivatedRoute) { 
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
    this.route.params.pipe(switchMap((params:Params)=>this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish;this.dishcopy=dish; this.setPrevNext(dish.id); });
    
    
    // this.dishservice.getDish(id).then((dish)=>this.dish=dish);
   // this.dishservice.getDish(id).subscribe((dish)=>this.dish=dish);
    }
    setPrevNext(dishId:string)
    {
      const index=this.dishIds.indexOf(dishId);
      this.prev=this.dishIds[(this.dishIds.length+index - 1)% this.dishIds.length];
      this.prev=this.dishIds[(this.dishIds.length+index + 1)% this.dishIds.length];
    }
goBack(){
  this.Location.back();
}
onSubmit() {
   this.commentData=this.feedbackForm.value;
   this.commentData.date=(new Date()).toString();
   //console.log(this.commentData);
  this.dishcopy.comments.push(this.commentData);
  //this.dish.comments=this.dish.comments.push(this.commentData);
  this.feedback = this.feedbackForm.value;
 // console.log(this.feedback);
  this.feedbackForm.reset({
    author: '',
    rating: '',
    comment: '',
   });
  this.feedbackFormDirective.resetForm();

}
}
