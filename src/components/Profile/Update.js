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
  Flex,
} from '@chakra-ui/react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useRef } from 'react';

const UpdateProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [errMsg, setErrMsg] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const errRef = useRef();
  const usernameRef = useRef();
  const useremailRef = useRef();
  const rolesRef = useRef();
  const departmentRef = useRef();
  const rolesKeyRef = useRef();
  const rolesValueRef = useRef();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${id}`, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUser(response.data);
      } catch (err) {
        console.error(err);
        navigate('/', { state: { from: location }, replace: true });
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(`/users/${user._id}`, {
        username: usernameRef.current.value,
        email: useremailRef.current.value,
        department: departmentRef.current.value,
        roles: {
          [rolesKeyRef.current.value]: rolesValueRef.current.value,
        },
      });
      console.log(response.data);
      navigate(`/grievance/profile/${user._id}`);
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('User ID Not Found');
      } else if (err.response?.status === 204) {
        setErrMsg('User Not Found');
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
          Update User
        </Heading>
        {user ? (
          <Box margin={'2rem 0'}>
            <FormControl margin={'1.5rem 0'}>
              <FormLabel htmlFor='username'>User Name</FormLabel>
              <Input
                id='username'
                type='text'
                defaultValue={user.username}
                ref={usernameRef}
              />
            </FormControl>
            <FormControl margin={'1.5rem 0'}>
              <FormLabel htmlFor='email'>User Email</FormLabel>
              <Input
                id='email'
                type='text'
                defaultValue={user.email}
                ref={useremailRef}
              />
            </FormControl>

            <FormControl margin={'1.5rem 0'}>
              <FormLabel htmlFor='department'>User Department</FormLabel>
              <Input
                id='department'
                type='text'
                defaultValue={user.department}
                ref={departmentRef}
              />
            </FormControl>
            <FormControl margin={'1.5rem 0'}>
              <FormLabel htmlFor='role'>User Role</FormLabel>
              {Object.keys(user.roles).map((role) => {
                return (
                  <Flex>
                    <Box
                      width={{
                        base: 'full',
                        md: '100%',
                      }}
                    >
                      <Input
                        id='role'
                        type='text'
                        defaultValue={role}
                        ref={rolesKeyRef}
                      />
                    </Box>
                    <Box
                      width={{
                        base: 'full',
                        md: '100%',
                      }}
                    >
                      <Input
                        id='role'
                        type='text'
                        defaultValue={user.roles[role]}
                        ref={rolesValueRef}
                      />
                    </Box>
                  </Flex>
                );
              })}
            </FormControl>
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
          <Button onClick={updateProfile} marginLeft={'1.5rem'}>
            Update
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default UpdateProfile;
