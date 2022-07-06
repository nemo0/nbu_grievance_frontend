import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { Link as RouterLink } from 'react-router-dom';

const Links = [
  {
    name: 'Home',
    link: '/grievance',
  },
  {
    name: 'All',
    link: '/grievance/all',
  },
  {
    name: 'My Grievances',
    link: '/grievance/my',
  },
  {
    name: 'Create Grievance',
    link: '/grievance/add',
  },
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Image
                src='https://upload.wikimedia.org/wikipedia/en/b/b2/University_of_North_Bengal_Logo.svg'
                alt='Logo'
                height={'8vh'}
              />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link, index) => (
                <NavLink key={index}>
                  <RouterLink to={link.link}>{link.name}</RouterLink>
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <RouterLink to={'/grievance/profile'}>Profile</RouterLink>
                </MenuItem>
                <MenuItem>
                  <RouterLink to={'/login'}>Log Out</RouterLink>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index}>
                  <RouterLink to={link.link}>{link.name}</RouterLink>
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
