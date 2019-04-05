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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { MedicalRecordComponent } from './MedicalRecord/MedicalRecord.component';

import { PatientComponent } from './Patient/Patient.component';
import { DoctorComponent } from './Doctor/Doctor.component';
import { ResearcherComponent } from './Researcher/Researcher.component';

import { CreateRecordComponent } from './CreateRecord/CreateRecord.component';
import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'MedicalRecord', component: MedicalRecordComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'Doctor', component: DoctorComponent },
  { path: 'Researcher', component: ResearcherComponent },
  { path: 'CreateRecord', component: CreateRecordComponent },
  { path: 'SetupDemo', component: SetupDemoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
