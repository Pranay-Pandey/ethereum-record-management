// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation


import {ethers} from 'ethers';

let contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userAadhar",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sex",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "age",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "speciality",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hospitalName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "publicKey",
				"type": "string"
			}
		],
		"name": "addDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userAadhar",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sex",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "age",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "publicKey",
				"type": "string"
			}
		],
		"name": "addPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "patientName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symptoms",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "document",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "docType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userAadhar",
				"type": "string"
			}
		],
		"name": "addRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "patientAadhar",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorAadhar",
				"type": "string"
			}
		],
		"name": "controlVisibility",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "patientName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symptoms",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "patientAadhar",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorAadhar",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorEncryptionMessage",
				"type": "string"
			}
		],
		"name": "makeAppointment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "patientAadhar",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorAadhar",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "newDoctorEncyptedMessage",
				"type": "string"
			}
		],
		"name": "shareDiagnosis",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "patientAadhar",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorAadhar",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "diagnosisIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "document",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "docType",
				"type": "string"
			}
		],
		"name": "updateDiagnosis",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "diagnosisList",
		"outputs": [
			{
				"internalType": "string",
				"name": "patientName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symptoms",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "document",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "docType",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "diagnosisVisibility",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "docInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sex",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "age",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "speciality",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hospital",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "docVisibility",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "patientAadhar",
				"type": "string"
			}
		],
		"name": "getPatientDiagnosis",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "patientName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "doctorName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "symptoms",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "diagnosis",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "document",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "docType",
						"type": "string"
					}
				],
				"internalType": "struct HealthRecordManagement.Diagnosis[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "hospital",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "medicalDiagnosisLen",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patientDiagnosis",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "patientInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sex",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "age",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "patientVisibility",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "publicKeys",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];





// Contract Address (You need to replace this with your actual contract address)
const contractAddress = '0xCd9e463a02C5dbe8a38A2240dD4baAEf7882E6ec';

// Connect to the contract


export const addPatient = async (sex, userAadhar, publicKey, name, age) => {
  try {
    
    const provider = new ethers.BrowserProvider(window?.ethereum!);
    let wallet = await provider.getSigner();
    console.log(window?.ethereum, wallet);
    // }s
    // else{
        // console.log("no provider found, not able to get ethers providers")
    // }

    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    const tx = await contract.addPatient(userAadhar, name, sex, age, publicKey);

    // Wait for the transaction to be mined
    await tx.wait();

    // Transaction successful
    console.log('Transaction successful');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const loginPatient = async (aadhar, privateKey) => {
    try {

      
      const provider = new ethers.BrowserProvider(window?.ethereum!);
      let wallet = await provider.getSigner();
      console.log(window?.ethereum, wallet);
      const contract = new ethers.Contract(contractAddress, contractABI, wallet);
      const patinetInfo = await contract.patientInfo(aadhar);
      const publicKey = await contract.publicKeys(aadhar);
  
      // Wait for the transaction to be mined
    //   await tx.wait();

    console.log("contract storage is as follows")
        console.log(patinetInfo)
        console.log("public keys is as follows")
        console.log(publicKey)
      // Transaction successful
      console.log('Transaction successful');

      const userDetails = {
        name: patinetInfo["0"],
        sex: patinetInfo["1"],
        age: patinetInfo["2"],
        publicKey: JSON.parse(publicKey),
      }

      return userDetails;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };




  export const addRecord = async (
	patientName,
	doctorName,
	symptoms,
	diagnosis,
	document,
	docType,
	userAadhar
  ) => {
	try {
	  // Connect to Ethereum provider (e.g., MetaMask)
	  const provider = new ethers.BrowserProvider(window?.ethereum!);
      let wallet = await provider.getSigner();
      console.log(window?.ethereum, wallet);
      const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  
	  // Call the contract's addRecord function
	  const tx = await contract.addRecord(
		patientName,
		doctorName,
		symptoms,
		diagnosis,
		document,
		docType,
		userAadhar
	  );
  
	  // Wait for the transaction to be mined
	  await tx.wait();
  
	  // Transaction successful
	  console.log('Transaction successful');
	} catch (error) {
	  console.error('Error:', error);
	  throw error;
	}
  };


  export const PatientDialist = async (userAadhar) => {
    try {

      
      const provider = new ethers.BrowserProvider(window?.ethereum!);
      let wallet = await provider.getSigner();
      console.log(window?.ethereum, wallet);
      const contract = new ethers.Contract(contractAddress, contractABI, wallet);
      const patinetInfo = await contract.getPatientDiagnosis(userAadhar);
  
      // Wait for the transaction to be mined
    //   await tx.wait();
		return patinetInfo;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };



















