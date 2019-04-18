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
import { MedicalRecordService } from './MedicalRecord.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-medicalrecord',
  templateUrl: './MedicalRecord.component.html',
  styleUrls: ['./MedicalRecord.component.css'],
  providers: [MedicalRecordService]
})
export class MedicalRecordComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  recordId = new FormControl('', Validators.required);
  creationTime = new FormControl('', Validators.required);
  medicalReport = new FormControl('', Validators.required);
  result = new FormControl('', Validators.required);
  creator = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceMedicalRecord: MedicalRecordService, fb: FormBuilder) {
    this.myForm = fb.group({
      recordId: this.recordId,
      creationTime: this.creationTime,
      medicalReport: this.medicalReport,
      result: this.result,
      creator: this.creator,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): any {
    const tempList = [];
    return this.serviceMedicalRecord.getAll().subscribe(
      result => { 
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
      }, 
      error => this.errorMessage = error
    );
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any):any {
    this.asset = {
      $class: 'org.example.patientnewtork.MedicalRecord',
      'recordId': this.recordId.value,
      'creationTime': this.creationTime.value,
      'medicalReport': this.medicalReport.value,
      'result': this.result.value,
      'creator': this.creator.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'recordId': null,
      'creationTime': null,
      'medicalReport': null,
      'result': null,
      'creator': null,
      'owner': null
    });

    return this.serviceMedicalRecord.addAsset(this.asset)
    .subscribe((error) => {
      this.errorMessage = error;
      this.myForm.setValue({
        'recordId': null,
        'creationTime': null,
        'medicalReport': null,
        'result': null,
        'creator': null,
        'owner': null
      });
      this.loadAll();
    });
    // .catch((error) => {
    //   if (error === 'Server error') {
    //       this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
    //   } else {
    //       this.errorMessage = error;
    //   }
    // });
  }


  updateAsset(form: any): any {
    this.asset = {
      $class: 'org.example.patientnewtork.MedicalRecord',
      'creationTime': this.creationTime.value,
      'medicalReport': this.medicalReport.value,
      'result': this.result.value,
      'creator': this.creator.value,
      'owner': this.owner.value
    };

    return this.serviceMedicalRecord.updateAsset(form.get('recordId').value, this.asset)
    .subscribe((error) => {
      this.errorMessage = error;
      this.loadAll();
    });
  }


  deleteAsset(): any {

    return this.serviceMedicalRecord.deleteAsset(this.currentId)
    .subscribe((error) => {
      this.errorMessage = error;
      this.loadAll();
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): any {

    return this.serviceMedicalRecord.getAsset(id)
    .subscribe((result) => {
      this.errorMessage = null;
      const formObject = {
        'recordId': null,
        'creationTime': null,
        'medicalReport': null,
        'result': null,
        'creator': null,
        'owner': null
      };

      if (result.recordId) {
        formObject.recordId = result.recordId;
      } else {
        formObject.recordId = null;
      }

      if (result.creationTime) {
        formObject.creationTime = result.creationTime;
      } else {
        formObject.creationTime = null;
      }

      if (result.medicalReport) {
        formObject.medicalReport = result.medicalReport;
      } else {
        formObject.medicalReport = null;
      }

      if (result.result) {
        formObject.result = result.result;
      } else {
        formObject.result = null;
      }

      if (result.creator) {
        formObject.creator = result.creator;
      } else {
        formObject.creator = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      this.myForm.setValue(formObject);

    }, (error) => this.errorMessage = error);
  }

  resetForm(): void {
    this.myForm.setValue({
      'recordId': null,
      'creationTime': null,
      'medicalReport': null,
      'result': null,
      'creator': null,
      'owner': null
      });
  }

}
