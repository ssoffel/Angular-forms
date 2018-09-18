import {Component} from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  languages = [];
  model = new Employee('', '',false, '', 'default');
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPoster){
      this.formPoster.getLanguages()
      .subscribe(
        data => this.languages = data.languages,
        err => console.log('get error: ', err)
      );
  }

  validatePrimaryLanguage(value){
    console.log("value: ", value)
    if(value === 'default'){
      this.hasPrimaryLanguageError = true;
    } else {
      this.hasPrimaryLanguageError = false
    }

    console.log(this.hasPrimaryLanguageError)
  }

  handleSubmit(form: NgForm){
    //validate form
    this.validatePrimaryLanguage(this.model.primaryLanguage)
    if(this.hasPrimaryLanguageError)
       return;
   
    this.formPoster.postEmployeeForm(this.model)
      .subscribe(
        data => console.log('sucess: ', data),
        err => console.log('error: ', err)
      )
  }
   
}
