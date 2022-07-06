import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import GrievanceCard from '../Cards/GrievanceMenu';

import { Box, Text, Container, Flex } from '@chakra-ui/react';

const MENU_ITEMS = [
  {
    title: 'All Grievance',
    link: '/grievance/All',
  },
  {
    title: 'My Grievance',
    link: '/grievance/My',
  },
  {
    title: 'Create Grievance',
    link: '/grievance/Add',
  },
  {
    title: 'All Users',
    link: '/grievance/users/all',
  },
];

const HomeAuthenticated = () => {
  return (
    <>
      <Header />
      <Container width={'full'}>
        <Flex margin={'6rem 0'} width={'full'} justifyContent={'space-around'}>
          {MENU_ITEMS.map((item, index) => (
            <GrievanceCard key={index} title={item.title} link={item.link} />
          ))}
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default HomeAuthenticated;
