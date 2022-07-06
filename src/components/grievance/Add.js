import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Text,
  FormHelperText,
  Select,
  Button,
} from '@chakra-ui/react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useRef } from 'react';

const AddGrievance = () => {
  const [grievance, setGrievance] = useState();
  const [errMsg, setErrMsg] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [grievanceId, setGrievanceId] = useState('');

  const errRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const departmentRef = useRef();
  const typeRef = useRef();

  useEffect(() => {
    setErrMsg('');
    setGrievanceId('');
  }, []);

  const addGrievance = async () => {
    try {
      //   const response = await axiosPrivate.post(
      //     `/grievance/`,
      //     JSON.stringify({
      //       title: titleRef.current.value,
      //       description: descriptionRef.current.value,
      //       department: departmentRef.current.value,
      //     })
      //   );
      //   console.log(response.data);
      //   navigate(`/grievance/${response.data.id}`);
      const grievance = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        department: departmentRef.current.value,
        type: typeRef.current.value,
      };
      const response = await axiosPrivate.post(`/grievance`, grievance);
      const data = await response.data;
      console.log(data._id);
      if (data) {
        setGrievanceId(data._id);
        navigate(`/grievance/${data._id}`);
      }
    } catch (err) {
      console.error(err);
      setErrMsg(err.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <Box
        width={{
          base: 'full',
          md: '80%',
        }}
        margin={'auto'}
      >
        <Heading margin={'1.5rem 0'} textAlign={'center'}>
          New Grievance
        </Heading>

        <Box margin={'2rem 0'}>
          <FormControl margin={'1.5rem 0'}>
            <FormLabel htmlFor='title'>Grievance Title</FormLabel>
            <Input id='title' type='text' ref={titleRef} />
          </FormControl>
          <FormControl margin={'1.5rem 0'}>
            <FormLabel htmlFor='description'>Grievance Description</FormLabel>
            <Textarea id='description' ref={descriptionRef}></Textarea>
          </FormControl>
          <FormControl margin={'1.5rem 0'}>
            <FormLabel htmlFor='department'>Grievance Department</FormLabel>
            <Input id='department' type='text' ref={departmentRef} />
          </FormControl>
          <FormControl margin={'1.5rem 0'}>
            <FormLabel htmlFor='type'>Grievance Type</FormLabel>
            <Input id='type' type='text' ref={typeRef} />
          </FormControl>

          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
        </Box>
        <Button onClick={addGrievance}>Add Grievance</Button>
      </Box>
      <Footer />
    </>
  );
};

export default AddGrievance;
