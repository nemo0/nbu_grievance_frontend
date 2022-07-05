import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import GrievanceCard from '../Cards/GrievanceMenu';

import { Box, Text, Container, Flex } from '@chakra-ui/react';

const MENU_ITEMS = [
  {
    title: 'All Grievance',
    link: '/grievance/all',
  },
  {
    title: 'My Grievance',
    link: '/grievance/my',
  },
  {
    title: 'Create Grievance',
    link: '/grievance/create',
  },
];

const HomeAuthenticated = () => {
  return (
    <>
      <Header />
      <Container>
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
