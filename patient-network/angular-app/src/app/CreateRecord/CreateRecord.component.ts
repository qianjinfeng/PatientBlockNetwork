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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CreateRecordService } from './CreateRecord.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-createrecord',
  templateUrl: './CreateRecord.component.html',
  styleUrls: ['./CreateRecord.component.css'],
  providers: [CreateRecordService]
})
export class CreateRecordComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  aRecord = new FormControl('', Validators.required);
  aDoctor = new FormControl('', Validators.required);
  aPatient = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceCreateRecord: CreateRecordService, fb: FormBuilder) {
    this.myForm = fb.group({
      aRecord: this.aRecord,
      aDoctor: this.aDoctor,
      aPatient: this.aPatient,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): any {
    const tempList = [];
    return this.serviceCreateRecord.getAll()
    .subscribe((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    }, error => this.errorMessage = error
    );
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): any {
    this.Transaction = {
      $class: 'org.example.patientnewtork.CreateRecord',
      'aRecord': this.aRecord.value,
      'aDoctor': this.aDoctor.value,
      'aPatient': this.aPatient.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'aRecord': null,
      'aDoctor': null,
      'aPatient': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceCreateRecord.addTransaction(this.Transaction)
    .subscribe(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'aRecord': null,
        'aDoctor': null,
        'aPatient': null,
        'transactionId': null,
        'timestamp': null
      });
    }, error => this.errorMessage = error);
  }

  updateTransaction(form: any): any {
    this.Transaction = {
      $class: 'org.example.patientnewtork.CreateRecord',
      'aRecord': this.aRecord.value,
      'aDoctor': this.aDoctor.value,
      'aPatient': this.aPatient.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceCreateRecord.updateTransaction(form.get('transactionId').value, this.Transaction)
    .subscribe(() => {
      this.errorMessage = null;
    });
  }

  deleteTransaction(): any {

    return this.serviceCreateRecord.deleteTransaction(this.currentId)
    .subscribe(() => {
      this.errorMessage = null;
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): any {

    return this.serviceCreateRecord.getTransaction(id)
    .subscribe((result) => {
      this.errorMessage = null;
      const formObject = {
        'aRecord': null,
        'aDoctor': null,
        'aPatient': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.aRecord) {
        formObject.aRecord = result.aRecord;
      } else {
        formObject.aRecord = null;
      }

      if (result.aDoctor) {
        formObject.aDoctor = result.aDoctor;
      } else {
        formObject.aDoctor = null;
      }

      if (result.aPatient) {
        formObject.aPatient = result.aPatient;
      } else {
        formObject.aPatient = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
      }

      this.myForm.setValue(formObject);

    }, error => this.errorMessage = error);
  }

  resetForm(): void {
    this.myForm.setValue({
      'aRecord': null,
      'aDoctor': null,
      'aPatient': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
