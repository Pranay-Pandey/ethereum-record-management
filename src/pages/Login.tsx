import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    RadioGroup,
    Radio,
    createStandaloneToast
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { showToast } from '../utils/showToasts';
import {useSessionStorage} from './../utils/useSessionStorage'
import {useNavigate} from 'react-router-dom'
import { loginPatient } from '../utils/operation';

const { toast, ToastContainer } = createStandaloneToast();

export default function SignupCard() {
    const [form, setForm] = useState({
        aadhar: '',
        privateKey:''
    })

    const [login,setSessionLogin] = useSessionStorage('login','false');
    const [token,setSessionToken] = useSessionStorage('token','');
    const [user,setSessionUser] = useSessionStorage('user',JSON.stringify({}))

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const allFieldsFilled = () => {
        const values = Object.values(form);
        return values.every(value => value.trim().length > 0);
    }

    const BASE_URL = 'https://ethback-i5fr.onrender.com/api';

    const handleSubmit = async () => {
        try {
          const shaHashResponse = await axios.post(BASE_URL+'/makeSHAhash', {
            aadhar: form.aadhar,
          });
      
          // Extract the hashedAadhar from the response
          const hashedAadhar = shaHashResponse.data.hashedAadhar;
          const loginResponse = await loginPatient(hashedAadhar, "login");
          setForm((prev) => ({
            ...prev,
            privateKey: form.privateKey.replace(/\\n/g, '\n'),
          }));
      
          const url = BASE_URL+'/login';
      
          const req = {
            RSAencryptedAESKEY: loginResponse.publicKey.RSAencryptedcipherKey,
            privateKey: form.privateKey,
            name: loginResponse.name,
            age: loginResponse.age,
            sex: loginResponse.sex,
            aadhar: form.aadhar,
          };
      
          const config = {
            maxBodyLength: Infinity,
            headers: {
              'Content-Type': 'application/json',
            },
          };
      
          axios
            .post(url, req, config)
            .then((response) => {
              const { message, name, age, sex, aadhar, token } = response.data;
              setSessionLogin("true");
              setSessionToken(token);
              setSessionUser(JSON.stringify({ name, age, sex, aadhar }));
              navigate('/patient_home');
              window.location.reload();
            })
            .catch((error) => {
              console.log(error.message);
            });
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      };



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
                            Login
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to start off quickly! ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                    
                                    <FormControl id="aadhar" isRequired>
                                        <FormLabel>Aadhar Card Number</FormLabel>
                                        <Input type="text" onChange={(e) => {
                                            setForm(prev => ({ ...prev, aadhar: e.target.value }))
                                        }} />
                                    </FormControl>
             
                            <FormControl id="privatekey" isRequired>
                                <FormLabel>Paste your Private Key</FormLabel>
                                <Input type="text" onChange={(e) => {
                                    setForm(prev => ({ ...prev, privateKey: e.target.value }))
                                }} />
                            </FormControl>
                        

                            <Stack spacing={10} pt={2}>
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
                                    Login
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Not registered? <Link color={'blue.400'} href="/register">Register</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <ToastContainer />
        </>
    )
}
