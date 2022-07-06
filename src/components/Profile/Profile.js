import { Box, Flex, Heading, Text, Button, Textarea } from '@chakra-ui/react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';

import React, { useEffect, useState, useRef } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const ProfileDetails = () => {
  const [profile, setProfile] = useState();
  const [errMsg, setErrMsg] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const commentRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getGrievance = async () => {
      try {
        const response = await axiosPrivate.get(`/users/profile`, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setProfile(response.data);
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

  return (
    <>
      <Header />
      <Box
        width={{
          base: '100%',
          md: '80%',
        }}
        margin={'auto'}
      >
        <Heading margin={'1.5rem 0'} textAlign={'center'}>
          User Profile
        </Heading>
        {profile ? (
          <Box>
            <Flex
              justifyContent={'space-between'}
              flexWrap={{
                base: 'wrap',
                md: 'no-wrap',
              }}
              marginBottom={'1rem'}
            >
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>User Name:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>{profile.username || 'No Title'}</Text>
              </Box>
            </Flex>
            <Flex
              justifyContent={'space-between'}
              flexWrap={{
                base: 'wrap',
                md: 'no-wrap',
              }}
              marginBottom={'1rem'}
            >
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>User Department:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>{profile.department}</Text>
              </Box>
            </Flex>
            <Flex
              justifyContent={'space-between'}
              flexWrap={{
                base: 'wrap',
                md: 'no-wrap',
              }}
              marginBottom={'1rem'}
            >
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>User Email:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>{profile.email}</Text>
              </Box>
            </Flex>
            <Flex
              justifyContent={'space-between'}
              flexWrap={{
                base: 'wrap',
                md: 'no-wrap',
              }}
              marginBottom={'1rem'}
            >
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>Profile Roles:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <>
                  {Object.keys(profile.roles).map((role, index) => {
                    return (
                      <Button key={index} marginRight={'1.2rem'} disabled>
                        {role}
                      </Button>
                    );
                  })}
                </>
              </Box>
            </Flex>

            <Box>
              <p
                ref={errRef}
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live='assertive'
              >
                {errMsg}
              </p>
            </Box>
          </Box>
        ) : (
          <Box>
            <Text>Loading...</Text>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default ProfileDetails;
