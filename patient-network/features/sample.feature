#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

Feature: Sample

    Background:
        Given I have deployed the business network definition ..
        And I have added the following participants of type org.example.patientnewtork.Doctor
            | doctorId          | name      | hospital |
            | alice@email.com   | Alice     | Hospital |

        And I have added the following participants of type org.example.patientnewtork.Patient
            | patientId         | name      | mobilePhone |
            | bob@email.com     | Bob       | 1357        |

        And I have added the following assets of type org.example.patientnewtork.MedicalRecord
            | recordId  | creator           | owner             | 
            | 1         | alice@email.com   | bob@email.com     |
        And I have issued the participant org.example.patientnewtork.Doctor#alice@email.com with the identity alice1
        And I have issued the participant org.example.patientnewtork.Patient#bob@email.com with the identity bob1

    Scenario: Bob can read all of the assets
        When I use the identity bob1
        Then I should have the following assets of type org.example.patientnewtork.MedicalRecord
            | recordId | owner           | medicalReport |
            | 1        | bob@email.com   | This is a medical report by a doctor    |


