import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Flex,
  Stack,
  Link,
  Image,
} from '@chakra-ui/react';

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export default function GrievanceCard(props) {
  return (
    <Flex
      bg='#edf3f8'
      _dark={{
        bg: '#3e3e3e',
      }}
      p={50}
      w='full'
      alignItems='center'
      justifyContent='center'
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
      >
        <Image
          w='full'
          h={56}
          fit='cover'
          src={`https://picsum.photos/${Math.floor(Math.random() * 999)}/400`}
          alt='avatar'
        />

        <Box py={5} textAlign='center'>
          <Link
            display='block'
            fontSize='2xl'
            color='gray.800'
            href={props.link}
            _dark={{
              color: 'white',
            }}
            fontWeight='bold'
          >
            {props.title}
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}
