import React, { useState, useEffect } from 'react'
import { useSessionStorage } from './../utils/useSessionStorage'
import UserDiagnosis from './../components/UserDiagnosis'
import {
  Box, FormControl, FormLabel, Icon, Input, Button, SimpleGrid, Flex, Stack, Heading
  , useColorModeValue, Select
} from '@chakra-ui/react'
import axios from 'axios'
import DiagnosisCard from '../components/DiagnosisCard'
import Card from "../components/Card";
import { PatientDialist , loginPatient} from '../utils/operation'

const PatientHome = () => {

  const [searchFilter, setSearchFilter] = useState('doctorName'); // Default filter
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  const [history, setHistory] = useState([]);
  const [user, setUser] = useSessionStorage('user', JSON.stringify({}));
  const [access, setAccess] = useState([]);
  const [hashedAadhar, setHashedAadhar] = useState('');

  const thisuser = JSON.parse(user);

  const [key, setKey] = useState({
    aadhar: thisuser.aadhar,
    privateKey: ''
  })

  useEffect(() => {
    console.log(key);
  }, [key])


  const handleSubmit = async () => {


    try{
      const shaHashResponse = await axios.post('http://localhost:4000/api/makeSHAhash', {
        aadhar: key.aadhar,
      });
  
      // Extract the hashedAadhar from the response
  const hashedAadhar = shaHashResponse.data.hashedAadhar;

  setHashedAadhar(hashedAadhar);
  const loginResponse = await loginPatient(hashedAadhar, "dfgdfgdfgdfg");

  // Get the patient's diagnosis
  const dialist = await PatientDialist(hashedAadhar);

  console.log("login Response is as follows = ")
  console.log(dialist["0"])

  let diagnosisList = []

  for(let field in dialist){
    let dia = {
      patientName: dialist[field]["0"],
      doctorName: dialist[field]["1"],
      symptoms :dialist[field]["2"],
      diagnosis: dialist[field]["3"],
      document :dialist[field]["4"],
      docType: dialist[field]["5"]
    }

    diagnosisList.push(dia);
  }

  console.log("diagnosis List = ", diagnosisList)

  setKey(prev => (
        {
          ...prev,
          privateKey: key.privateKey.replace(/\\n/g, '\n')
        }
  ))

  const req = {
    RSAencryptedAESKEY: loginResponse.publicKey.RSAencryptedcipherKey,
    privateKey: key.privateKey,
    diagnosisList: diagnosisList
  }

  const url = 'http://localhost:4000/api/decrypt_diagnosis'; 
  
  const config = {
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'application/json',
    },
  };


  axios.post(url, req, config)
            .then((response) => {
              const { message, data } = response.data;
              console.log("final output = ")
              console.log(data)

              setData(data);


                  const newDiagnosisElements = data.map((item: any) => (
        <DiagnosisCard
          key={item._id}
          symptoms={item.symptoms}
          doctorName={item.doctorName}
          diagnosis={item.diagnosis}
          document={item.document}
          patientName={item.patientName}
          docType={item.docType}
          upload={false}
        />
      ));
      setHistory(newDiagnosisElements);

            })
            .catch((error) => {
              console.log(error.message);
            });

    }
    catch(e){
        console.log("error = ", e)
    }

  }

  async function remove(item: any){
    console.log("remove function called")
  }

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              All Diagnosis
            </Heading>
            <FormControl id="key" isRequired>
              <FormLabel>Enter your private key</FormLabel>
              <Input type="text" onChange={(e) => {
                setKey(prev => ({ ...prev, privateKey: e.target.value }))
              }} />
            </FormControl>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={(e) => {
                handleSubmit();
              }}>
              Show Diagnosis
            </Button>

            { history.length>0 && <>
            
              <FormControl id="search">
                    <FormLabel>Search by:</FormLabel>
                    <Select value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}>
                      <option value="doctorName">Doctor Name</option>
                      <option value="docType">Document Type</option>
                      <option value="diagnosis">Diagnosis</option>
                      <option value="symptoms">Symptoms</option>
                    </Select>
                    <FormLabel>Search Query:</FormLabel>
                    <Input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <Button
                      size="md"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      onClick={(e) => {
                        const newDiagnosisElements = data
                            .filter(item => {
                              const searchQueryLower = searchQuery.toLowerCase(); 
                              switch (searchFilter) {
                                case 'doctorName':
                                  return item.doctorName.toLowerCase().includes(searchQueryLower);
                                case 'docType':
                                  return item.docType.toLowerCase().includes(searchQueryLower);
                                case 'diagnosis':
                                  return item.diagnosis.toLowerCase().includes(searchQueryLower);
                                case 'symptoms':
                                  return item.symptoms.toLowerCase().includes(searchQueryLower);
                                  default:
                                  return true; // Default to including all items
                              }
                            })
                            .map(item => (
                              <DiagnosisCard
                                key={item._id}
                                symptoms={item.symptoms}
                                doctorName={item.doctorName}
                                diagnosis={item.diagnosis}
                                document={item.document}
                                patientName={item.patientName}
                                docType={item.docType}
                                upload={false}
                              />
                            ));
                          setHistory(newDiagnosisElements);
                      }}>
                      Search Diagnosis
                    </Button>
                  </FormControl>

            </>}
            {history}
            {/* { access.length>0 && <Heading fontSize={'4xl'} textAlign={'center'}>Doctors who have access<Heading/> } */}
            { access.length>0 && <Heading fontSize={'2xl'} textAlign={'center'}>
              All Doctors with Access to your Diagnosis
            </Heading>}
            <Stack spacing={4} style={{ flex: 1, flexDirection: "row" }}>
            
            {access.map(item => {
              
              return <Card title={item.name} sex={item.sex} age={item.age} 
              speciality={item.speciality} controlVisiblity={()=>remove(item.aadhar)}/>;
            })}
          </Stack>

          </Stack>
        </Stack>
      </Flex>
    </>
  )
}

export default PatientHome