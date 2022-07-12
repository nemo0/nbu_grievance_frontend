import { Box, Flex, Heading, Text, Button, Textarea } from '@chakra-ui/react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';

import React, { useEffect, useState, useRef } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const GrievanceDetails = () => {
  const { id } = useParams();
  const [grievance, setGrievance] = useState();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState();
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
        const response = await axiosPrivate.get(`/grievance/${id}`, {
          signal: controller.signal,
        });
        // console.log(response.data);
        const data = await response.data;
        isMounted && setGrievance(data);
      } catch (err) {
        console.error(err);
        navigate('/', { state: { from: location }, replace: true });
      }
    };

    getGrievance();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const addComment = async () => {
    try {
      const response = await axiosPrivate.post(`/grievance/comments/${id}/`, {
        comment: commentRef.current.value,
      });
      console.log(response.data);
      const data = await response.data;
      setComment(data);
      setComments(data);
      navigate(`/grievance/${comment._id}`);
      commentRef.current.value = '';
    } catch (err) {
      console.error(err);
      setErrMsg(err.response.data.message);
      errRef.current.focus();
      // navigate('/login', { state: { from: location }, replace: true });
    }
  };

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
          Grievance Details
        </Heading>
        {grievance ? (
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
                <Text>Grievance Name:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>{grievance.grievanceTitle || 'No Title'}</Text>
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
                <Text>Grievance Description:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>{grievance.grievanceDescription}</Text>
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
                <Text>Grievance Created By:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>{grievance.grievanceCreatedBy}</Text>
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
                <Text>Grievance Status:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>{grievance.grievanceStatus}</Text>
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
                <Text>Grievance Priority:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>{grievance.grievancePriority}</Text>
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
                <Text>Grievance Department:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>{grievance.grievanceDepartment}</Text>
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
                <Text>Grievance Type:</Text>
              </Box>
              <Box
                width={{
                  base: 'full',
                  md: '50%',
                }}
              >
                <Text>{grievance.grievanceType}</Text>
              </Box>
            </Flex>
            <Box>
              <Text fontSize={'2rem'} fontWeight={'bold'}>
                Comments
              </Text>
              {grievance ? (
                grievance.grievanceComments.map((comment, index) => {
                  return (
                    <Box key={index}>
                      <Text>{comment.comment}</Text>
                      <Text fontSize={'xs'}>by {comment.commentByName}</Text>
                    </Box>
                  );
                })
              ) : (
                <Text>No Comments</Text>
              )}
            </Box>
            <Flex justifyContent={'flex-end'} margin={'2rem 0'}>
              <Link to={`/grievance/edit/${grievance._id}`}>
                <Button>Update or Close</Button>
              </Link>
            </Flex>
            <Box>
              <p
                ref={errRef}
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live='assertive'
              >
                {errMsg}
              </p>
              <Textarea ref={commentRef}></Textarea>
              <Button onClick={addComment}>Add Comment</Button>
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

export default GrievanceDetails;
