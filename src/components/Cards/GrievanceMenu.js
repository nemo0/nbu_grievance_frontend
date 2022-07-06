import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Flex,
  Stack,
  Image,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export default function GrievanceCard(props) {
  return (
    <Link to={props.link}>
      <Flex
        bg='#edf3f8'
        _dark={{
          bg: '#1a202c',
          opacity: 0.6,
        }}
        p={50}
        w='full'
        alignItems='center'
        justifyContent='center'
        _hover={{
          scale: 1.05,
        }}
      >
        <Box
          w='xs'
          bg='white'
          _dark={{
            bg: 'gray.800',
          }}
          shadow='lg'
          rounded='lg'
          overflow='hidden'
          mx='auto'
          boxShadow={'0px 0px 10px rgba(0, 0, 0, 0.6)'}
        >
          <Image
            w='full'
            h={56}
            fit='cover'
            src={`https://picsum.photos/${Math.floor(Math.random() * 999)}/400`}
            alt='avatar'
          />

          <Box py={5} textAlign='center'>
            <Heading
              display='block'
              fontSize='2xl'
              color='gray.800'
              _dark={{
                color: 'white',
              }}
              fontWeight='bold'
            >
              {props.title}
            </Heading>
          </Box>
        </Box>
      </Flex>
    </Link>
  );
}
