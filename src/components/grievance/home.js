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
  {
    title: 'My Department Grievances',
    link: '/grievance/department/my',
  },
];

const HomeAuthenticated = () => {
  return (
    <>
      <Header />
      <Box width={'full'}>
        <Flex margin={'2rem'} justifyContent={'space-around'} flexWrap={'wrap'}>
          {MENU_ITEMS.map((item, index) => (
            <GrievanceCard key={index} title={item.title} link={item.link} />
          ))}
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default HomeAuthenticated;
