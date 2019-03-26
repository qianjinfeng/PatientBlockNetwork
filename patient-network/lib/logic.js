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
