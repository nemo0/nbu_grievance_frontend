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

const UpdateGrievance = () => {
  const { id } = useParams();
  const [grievance, setGrievance] = useState();
  const [errMsg, setErrMsg] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const errRef = useRef();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getGrievance = async () => {
      try {
        const response = await axiosPrivate.get(`/grievance/${id}`, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setGrievance(response.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getGrievance();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [grievance]);

  const closeGrievance = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(
        `/grievance/close/${grievance._id}`,
        {
          status: 'closed',
        }
      );
      console.log(response.data);
      navigate('/grievance/all');
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Grievance ID Not Found');
      } else if (err.response?.status === 204) {
        setErrMsg('Grievance Not Found');
      } else {
        setErrMsg('Something went wrong');
      }
      errRef.current.focus();
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
        {grievance ? (
          <Box margin={'2rem 0'}>
            <FormControl margin={'1.5rem 0'}>
              <FormLabel htmlFor='title'>Grievance Title</FormLabel>
              <Input
                id='title'
                type='text'
                defaultValue={grievance.grievanceTitle}
              />
            </FormControl>
            <FormControl margin={'1.5rem 0'}>
              <FormLabel htmlFor='description'>Grievance Description</FormLabel>
              <Textarea
                id='description'
                defaultValue={grievance.grievanceDescription}
              ></Textarea>
            </FormControl>
            <FormControl margin={'1.5rem 0'}>
              <FormLabel htmlFor='department'>Grievance Department</FormLabel>
              <Input
                id='department'
                type='text'
                defaultValue={grievance.grievanceDepartment}
              />
            </FormControl>
            <FormControl margin={'1.5rem 0'}>
              <FormLabel htmlFor='staus'>Grievance Status</FormLabel>
              <Select defaultValue={grievance.grievanceStatus}>
                <option value={'Open'}>Open</option>
                <option value={'Processing'}>Processing</option>
                <option value={'Closed'}>Closed</option>
              </Select>
            </FormControl>
            <FormControl margin={'1.5rem 0'}>
              <FormLabel htmlFor='priority'>Grievance Priority</FormLabel>
              <Select defaultValue={grievance.grievancePriority}>
                <option value={'Low'}>Low</option>
                <option value={'Medium'}>Medium</option>
                <option value={'High'}>High</option>
              </Select>
            </FormControl>
            <Box>
              <Text fontSize={'2rem'} fontWeight={'bold'}>
                Comments
              </Text>
              {grievance.grievanceComments.map((comment, index) => {
                return (
                  <Box key={index}>
                    <Text>{comment.comment}</Text>
                    <Text fontSize={'xs'}>by {comment.commentByName}</Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ) : (
          <Box>
            <Text>Loading...</Text>
          </Box>
        )}
        <Box>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
        </Box>
        <Box display={'flex'} justifyContent={'flex-end'} marginBottom={'2rem'}>
          {grievance && grievance.grievanceStatus.toLowerCase() === 'open' ? (
            <Button onClick={closeGrievance} bgColor={'green'}>
              Close Grievance
            </Button>
          ) : (
            <Button disabled>Close Grievance</Button>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default UpdateGrievance;
