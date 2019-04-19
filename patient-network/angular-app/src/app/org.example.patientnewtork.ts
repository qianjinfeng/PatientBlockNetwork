import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.patientnewtork{
   export class DICOMImage {
      pixel: string;
   }
   export class ExaminationResult {
      images: DICOMImage[];
      testResult: string;
   }
   export class MedicalRecord extends Asset {
      recordId: string;
      creationTime: Date;
      medicalReport: string;
      result: ExaminationResult;
      creator: Doctor;
      owner: Patient;
   }
   export abstract class Person extends Participant {
      id: string;
      name: string;
      mobilePhone: string;
      city: string;
   }
   export class Patient extends Person {
   }
   export class Doctor extends Person {
      hospital: string;
   }
   export class Researcher extends Person {
      institution: string;
   }
   export class CreateRecord extends Transaction {
      aRecord: MedicalRecord;
      aDoctor: Doctor;
      aPatient: Patient;
   }
   export class SetupDemo extends Transaction {
   }
   export class CreateRecordEvent extends Event {
      aRecord: MedicalRecord;
   }
   export class Wallet {
      name: string;
      default: boolean;
   }
// }
