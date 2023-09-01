// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation


import {ethers} from 'ethers';
import contractABI from '/src/utils/abi.json';

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



















