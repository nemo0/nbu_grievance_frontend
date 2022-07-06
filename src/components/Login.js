import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Checkbox,
  Container,
  Flex,
  Image,
  Button,
} from '@chakra-ui/react';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist ? 'true' : 'false');
  }, [persist]);

  return (
    // <section>
    //   <p
    //     ref={errRef}
    //     className={errMsg ? 'errmsg' : 'offscreen'}
    //     aria-live='assertive'
    //   >
    //     {errMsg}
    //   </p>
    //   <h1>Sign In</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor='username'>Username:</label>
    //     <input
    //       type='text'
    //       id='username'
    //       ref={userRef}
    //       autoComplete='off'
    //       onChange={(e) => setUser(e.target.value)}
    //       value={user}
    //       required
    //     />

    //     <label htmlFor='password'>Password:</label>
    //     <input
    //       type='password'
    //       id='password'
    //       onChange={(e) => setPwd(e.target.value)}
    //       value={pwd}
    //       required
    //     />
    //     <button>Sign In</button>
    //     <div className='persistCheck'>
    //       <input
    //         type='checkbox'
    //         id='persist'
    //         onChange={togglePersist}
    //         checked={persist}
    //       />
    //       <label for='persist'>Trust this device?</label>
    //     </div>
    //   </form>
    //   <p>
    //     Need an Account?
    //     <br />
    //     <span className='line'>
    //       <Link to='/register'>Sign Up</Link>
    //     </span>
    //   </p>
    // </section>
    <Container>
      <Flex
        width={'full'}
        height={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Box>
          <Box boxSize={'sm'} display='flex' justifyContent={'center'}>
            <Image
              src='https://upload.wikimedia.org/wikipedia/en/b/b2/University_of_North_Bengal_Logo.svg'
              alt='logo'
              width={'240px'}
            />
          </Box>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <Input
                id='username'
                type='text'
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                type='password'
                ref={userRef}
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </FormControl>
            <FormControl>
              <input
                type='checkbox'
                id='persist'
                onChange={togglePersist}
                checked={persist}
              />
              <label htmlFor='persist'>Trust this device?</label>
            </FormControl>
            <Button type='submit'>Log In</Button>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
