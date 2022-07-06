import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

import HomeAuthenticated from './components/grievance/home';
import AllGrievances from './components/grievance/All';
import GrievanceDetails from './components/grievance/Details';
import UpdateGrievance from './components/grievance/Update';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
  Department: 2002,
};

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='linkpage' element={<LinkPage />} />
          <Route path='unauthorized' element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path='/' element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path='editor' element={<Editor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path='admin' element={<Admin />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
              }
            >
              <Route path='lounge' element={<Lounge />} />
            </Route>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[
                    ROLES.Editor,
                    ROLES.Admin,
                    ROLES.User,
                    ROLES.Department,
                  ]}
                />
              }
            >
              <Route path='grievance' element={<HomeAuthenticated />} />
              <Route path='grievance/all' element={<AllGrievances />} />
              <Route path='grievance/:id' element={<GrievanceDetails />} />
              <Route path='grievance/edit/:id' element={<UpdateGrievance />} />
            </Route>
          </Route>
          {/* catch all */}
          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
