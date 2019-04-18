/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ResearcherService } from './Researcher.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-researcher',
  templateUrl: './Researcher.component.html',
  styleUrls: ['./Researcher.component.css'],
  providers: [ResearcherService]
})
export class ResearcherComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  institution = new FormControl('', Validators.required);
  id = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  mobilePhone = new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);


  constructor(public serviceResearcher: ResearcherService, fb: FormBuilder) {
    this.myForm = fb.group({
      institution: this.institution,
      id: this.id,
      name: this.name,
      mobilePhone: this.mobilePhone,
      city: this.city
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): any {
    const tempList = [];
    return this.serviceResearcher.getAll()
    .subscribe((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    }, error => this.errorMessage = error);
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): any {
    this.participant = {
      $class: 'org.example.patientnewtork.Researcher',
      'institution': this.institution.value,
      'id': this.id.value,
      'name': this.name.value,
      'mobilePhone': this.mobilePhone.value,
      'city': this.city.value
    };

    this.myForm.setValue({
      'institution': null,
      'id': null,
      'name': null,
      'mobilePhone': null,
      'city': null
    });

    return this.serviceResearcher.addParticipant(this.participant)
    .subscribe(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'institution': null,
        'id': null,
        'name': null,
        'mobilePhone': null,
        'city': null
      });
      this.loadAll(); 
    }, error => this.errorMessage = error);

  }


   updateParticipant(form: any): any {
    this.participant = {
      $class: 'org.example.patientnewtork.Researcher',
      'institution': this.institution.value,
      'name': this.name.value,
      'mobilePhone': this.mobilePhone.value,
      'city': this.city.value
    };

    return this.serviceResearcher.updateParticipant(form.get('id').value, this.participant)
    .subscribe(() => {
      this.errorMessage = null;
      this.loadAll();
    }, error => this.errorMessage = error);

  }


  deleteParticipant(): any {

    return this.serviceResearcher.deleteParticipant(this.currentId)
    .subscribe(() => {
      this.errorMessage = null;
      this.loadAll();
    }, error => this.errorMessage = error);
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): any {

    return this.serviceResearcher.getparticipant(id)
    .subscribe((result) => {
      this.errorMessage = null;
      const formObject = {
        'institution': null,
        'id': null,
        'name': null,
        'mobilePhone': null,
        'city': null
      };

      if (result.institution) {
        formObject.institution = result.institution;
      } else {
        formObject.institution = null;
      }

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.mobilePhone) {
        formObject.mobilePhone = result.mobilePhone;
      } else {
        formObject.mobilePhone = null;
      }

      if (result.city) {
        formObject.city = result.city;
      } else {
        formObject.city = null;
      }

      this.myForm.setValue(formObject);
    }, error => this.errorMessage = error);

  }

  resetForm(): void {
    this.myForm.setValue({
      'institution': null,
      'id': null,
      'name': null,
      'mobilePhone': null,
      'city': null
    });
  }
}
