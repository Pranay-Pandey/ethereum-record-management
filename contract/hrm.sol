pragma solidity ^0.8.0;

contract HealthRecordManagement {
    struct PatientInfo {
        string name;
        string sex;
        string age;
    }

    struct Diagnosis {
        string patientName;
        string doctorName;
        string symptoms;
        string diagnosis;
        string document;
        string docType;
    }

    struct DoctorInfo {
        string name;
        string sex;
        string age;
        string speciality;
        string hospital;
    }

    mapping(string => PatientInfo) public patientInfo;
    mapping(uint256 => Diagnosis) public diagnosisList;
    mapping(string => uint256[]) public patientDiagnosis;
    mapping(uint256 => string) public diagnosisVisibility;
    mapping(string => mapping(string => string)) public patientVisibility;
    mapping(string => mapping(string => string)) public docVisibility;
    mapping(string => DoctorInfo) public docInfo;
    mapping(string => string) public hospital;
    mapping(string => string) public publicKeys;

    uint256 public medicalDiagnosisLen;

    function addPatient(
        string memory userAadhar,
        string memory name,
        string memory sex,
        string memory age,
        string memory publicKey
    ) public {
        require(bytes(patientInfo[userAadhar].name).length == 0, "User Already Exists");

        patientInfo[userAadhar] = PatientInfo({
            name: name,
            sex: sex,
            age: age
        });

        publicKeys[userAadhar] = publicKey;
    }

    function addRecord(
        string memory patientName,
        string memory doctorName,
        string memory symptoms,
        string memory diagnosis,
        string memory document,
        string memory docType,
        string memory userAadhar
    ) public {
        Diagnosis storage newDiagnosis = diagnosisList[medicalDiagnosisLen];
        newDiagnosis.patientName = patientName;
        newDiagnosis.doctorName = doctorName;
        newDiagnosis.symptoms = symptoms;
        newDiagnosis.diagnosis = diagnosis;
        newDiagnosis.document = document;
        newDiagnosis.docType = docType;

        uint256 currentNum = medicalDiagnosisLen;
        medicalDiagnosisLen++;

        patientDiagnosis[userAadhar].push(currentNum);
        diagnosisVisibility[currentNum] = userAadhar;
    }

    function addDoctor(
        string memory userAadhar,
        string memory name,
        string memory sex,
        string memory age,
        string memory speciality,
        string memory hospitalName,
        string memory publicKey
    ) public {
        require(bytes(docInfo[userAadhar].name).length == 0, "Doctor Already exists");

        docInfo[userAadhar] = DoctorInfo({
            name: name,
            sex: sex,
            age: age,
            speciality: speciality,
            hospital: hospitalName
        });

        hospital[hospitalName] = userAadhar;
        publicKeys[userAadhar] = publicKey;
    }

    function makeAppointment(
        string memory patientName,
        string memory doctorName,
        string memory symptoms,
        string memory patientAadhar,
        string memory doctorAadhar,
        string memory doctorEncryptionMessage
    ) public {
        require(bytes(patientInfo[patientAadhar].name).length > 0, "No Patient found with the specifications");
        require(bytes(docInfo[doctorAadhar].name).length > 0, "No doctor found with the provided specifications");

        Diagnosis storage newDiagnosis = diagnosisList[medicalDiagnosisLen];
        newDiagnosis.patientName = patientInfo[patientAadhar].name;
        newDiagnosis.doctorName = doctorName;
        newDiagnosis.symptoms = symptoms;

        uint256 currentNum = medicalDiagnosisLen;
        medicalDiagnosisLen++;

        patientDiagnosis[patientAadhar].push(currentNum);
        diagnosisVisibility[currentNum] = patientAadhar;

        docVisibility[doctorAadhar][patientAadhar] = doctorEncryptionMessage;
        patientVisibility[patientAadhar][doctorAadhar] = "1";
    }

    function shareDiagnosis(
        string memory patientAadhar,
        string memory doctorAadhar,
        string memory newDoctorEncyptedMessage
    ) public {
        docVisibility[doctorAadhar][patientAadhar] = newDoctorEncyptedMessage;
        patientVisibility[patientAadhar][doctorAadhar] = "1";
    }

    function controlVisibility(string memory patientAadhar, string memory doctorAadhar) public {
        require(bytes(patientInfo[patientAadhar].name).length > 0, "No patient found");
        require(bytes(docInfo[doctorAadhar].name).length > 0, "No doctor found");
        require(bytes(docVisibility[doctorAadhar][patientAadhar]).length > 0, "Doctor does not have access");

        docVisibility[doctorAadhar][patientAadhar] = "";
        patientVisibility[patientAadhar][doctorAadhar] = "0";
    }

    function updateDiagnosis(
        string memory patientAadhar,
        string memory doctorAadhar,
        uint256 diagnosisIndex,
        string memory diagnosis,
        string memory document,
        string memory docType
    ) public {
        require(bytes(patientInfo[patientAadhar].name).length > 0, "No Patient found with the specifications");
        require(bytes(docInfo[doctorAadhar].name).length > 0, "No doctor found with the provided specifications");
        require(diagnosisIndex < medicalDiagnosisLen, "No diagnosis found in the store");
        require(bytes(diagnosisVisibility[diagnosisIndex]).length > 0, "No diagnosis found in the store");
        require(bytes(docVisibility[doctorAadhar][patientAadhar]).length > 0, "You do not have the permission to view this diagnosis");

        string memory patientName = patientInfo[patientAadhar].name;
        string memory doctorName = diagnosisList[diagnosisIndex].doctorName;
        string memory symptoms = diagnosisList[diagnosisIndex].symptoms;

        Diagnosis storage updatedDiagnosis = diagnosisList[diagnosisIndex];
        updatedDiagnosis.patientName = patientName;
        updatedDiagnosis.doctorName = doctorName;
        updatedDiagnosis.symptoms = symptoms;
        updatedDiagnosis.diagnosis = diagnosis;
        updatedDiagnosis.document = document;
        updatedDiagnosis.docType = docType;
    }

    function getPatientDiagnosis(string memory patientAadhar) public view returns (Diagnosis[] memory) {
        uint256[] storage diagnosisIndices = patientDiagnosis[patientAadhar];
        uint256 numDiagnoses = diagnosisIndices.length;
        Diagnosis[] memory diagnoses = new Diagnosis[](numDiagnoses);

        for (uint256 i = 0; i < numDiagnoses; i++) {
            uint256 diagnosisIndex = diagnosisIndices[i];
            diagnoses[i] = diagnosisList[diagnosisIndex];
        }

        return diagnoses;
    }
}

