import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Container,
  Flex,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';

const ALL_USERS_URL = '/users/';

const AllProfiles = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(ALL_USERS_URL, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const data = React.useMemo(() => users, [users]) || [];
  const columns = React.useMemo(
    () => [
      {
        Header: 'User Name',
        accessor: 'username',
      },
      {
        Header: 'User Email',
        accessor: 'email',
      },
      {
        Header: 'User Department',
        accessor: 'department',
      },

      {
        Header: 'View User',
        accessor: '_id',
        Cell: ({ cell: { value } }) => (
          <Link to={`/grievance/profile/${value}`}>Click to view</Link>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Header />
      <Container height={'auto'} width={'full'}>
        <Flex justifyContent={'center'} margin={'2rem 0'}>
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      isNumeric={column.isNumeric}
                    >
                      {column.render('Header')}
                      <chakra.span pl='4'>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon aria-label='sorted descending' />
                          ) : (
                            <TriangleUpIcon aria-label='sorted ascending' />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <Td
                        {...cell.getCellProps()}
                        isNumeric={cell.column.isNumeric}
                      >
                        {cell.render('Cell')}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default AllProfiles;
