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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.example.patientnewtork.CreateRecord} createRecord
 * @transaction
 */
async function CreateRecord(tx_request) {
    console.log('CreateRecord');

    const factory = getFactory();
    const namespace = 'org.example.patientnewtork';

    const aRecord = factory.newResource(namespace, 'MedicalRecord', tx_request.aRecord.recordId);
    aRecord.owner = factory.newRelationship(namespace, 'Patient', tx_request.aPatient.getIdentifier());
    aRecord.creator = factory.newRelationship(namespace, 'Doctor', tx_request.aDoctor.getIdentifier());

    // Get the record registry and save the record.
    const assetRegistry = await getAssetRegistry(aRecord.getFullyQualifiedType());
    await assetRegistry.add(aRecord);

    // emit the event
    const createRecordEvent = factory.newEvent(namespace, 'CreateRecordEvent');
    createRecordEvent.aRecord = aRecord;
    emit(createRecordEvent);
}

/**
 * Setup the demo
 * @param {org.example.patientnewtork.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
async function setupDemo(setupDemo) { // eslint-disable-line no-unused-vars
    console.log('setupDemo');
    const factory = getFactory();
    const NS = 'org.example.patientnewtork';

    //Create paticipants
    const patient_1 =factory.newResource(NS, 'Patient', 'Patient_1');
    patient_1.name = 'John';
    patient_1.mobilePhone = '1234567';
    patient_1.city = 'ShangHai';

    const patient_2 =factory.newResource(NS, 'Patient', 'Patient_2');
    patient_2.name = 'Zhang';
    patient_2.mobilePhone = '666239';
    patient_2.city = 'ZheJiang';

    //Doctor1 is a radiologist; Doctor2 is a surgeon
    const doctor_1 =factory.newResource(NS, 'Doctor', 'Doctor_1');
    doctor_1.name = 'Willams';
    doctor_1.hospital = '10th People Hospital';

    const doctor_2 =factory.newResource(NS, 'Doctor', 'Doctor_2');
    doctor_2.name = 'Lee';
    doctor_2.hospital = 'RenJi Hospital';

    const researcher_1 =factory.newResource(NS, 'Researcher', 'Researcher_1');
    researcher_1.name = 'Rose';
    researcher_1.institution = 'Science Techology University';

    //Create record
    const record1 = factory.newResource(NS, 'MedicalRecord', 'Record_1');
    record1.creator = factory.newRelationship(NS, 'Doctor', 'Doctor_1');
    record1.owner = factory.newRelationship(NS, 'Patient', 'Patient_1');
    record1.medicalReport = 'DICOM image show no sign';
    record1.creationTime = setupDemo.timestamp;

    const record2 = factory.newResource(NS, 'MedicalRecord', 'Record_2');
    record2.creator = factory.newRelationship(NS, 'Doctor', 'Doctor_2');
    record2.owner = factory.newRelationship(NS, 'Patient', 'Patient_1');
    record2.medicalReport = 'Blood test is OK';
    record2.creationTime = setupDemo.timestamp;

    const record3 = factory.newResource(NS, 'MedicalRecord', 'Record_3');
    record3.creator = factory.newRelationship(NS, 'Doctor', 'Doctor_1');
    record3.owner = factory.newRelationship(NS, 'Patient', 'Patient_2');
    record3.medicalReport = 'DICOM image show tuma'
    record3.creationTime = setupDemo.timestamp;

    // add the patients
    const patientRegistry = await getParticipantRegistry(NS + '.Patient');
    await patientRegistry.addAll([patient_1, patient_2]);

    // add the doctors
    const doctorRegistry = await getParticipantRegistry(NS + '.Doctor');
    await doctorRegistry.addAll([doctor_1, doctor_2]);

    // add the researchers
    const resercherRegistry = await getParticipantRegistry(NS + '.Researcher');
    await resercherRegistry.addAll([researcher_1]);

    // add the records
    const recordRegistry = await getAssetRegistry(NS + '.MedicalRecord');
    await recordRegistry.addAll([record1, record2, record3]);
}
