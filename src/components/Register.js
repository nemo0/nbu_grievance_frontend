import { useRef, useState, useEffect } from 'react';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

import {
  Input,
  Label,
  FormControl,
  FormHelperText,
  Button,
  Select,
  Image,
  Box,
  Heading,
} from '@chakra-ui/react';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
const REGISTER_URL = '/register';

const DEPARTMENTS = [
  'Computer Science and Applicatio',
  'Bangla',
  'English',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Accounting',
  'Economics',
  'Business',
  'Management',
  'History',
  'Geography',
  'Philosophy',
  'Religion',
  'Sociology',
  'Political Science',
  'Psychology',
  'Physical Education',
  'Home Science',
  'Agriculture',
  'Tea Management',
  'Law',
  'Microbiology',
  'Botany',
  'Zoology',
];

const Register = () => {
  const userRef = useRef();
  const departmentRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [EmailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [department, setDepartment] = useState('');

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd, email, department }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setUser('');
      setPwd('');
      setMatchPwd('');
      setEmail('');
      setDepartment('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to='/login'>Sign In</Link>
          </p>
        </section>
      ) : (
        <Box
          width={{
            base: '100%',
            md: '70%',
          }}
          margin={'auto'}
          padding={'12rem'}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            marginBottom={'4rem'}
          >
            <Image
              src='https://upload.wikimedia.org/wikipedia/en/b/b2/University_of_North_Bengal_Logo.svg'
              alt='logo'
              width={'240px'}
            />
            <Heading>Grievance Management System</Heading>
          </Box>
          <section>
            <p
              ref={errRef}
              className={errMsg ? 'errmsg' : 'offscreen'}
              aria-live='assertive'
            >
              {errMsg}
            </p>
            <Heading marginBottom={'2rem'}>Register</Heading>
            <form onSubmit={handleSubmit}>
              <label htmlFor='username'>
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !user ? 'hide' : 'invalid'}
                />
              </label>
              <Input
                type='text'
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby='uidnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id='uidnote'
                className={
                  userFocus && user && !validName ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

              <label htmlFor='department'>Department:</label>
              <Select
                ref={departmentRef}
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
              >
                {DEPARTMENTS.map((department, index) => {
                  return (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  );
                })}
              </Select>

              <label htmlFor='email'>
                Email:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !email ? 'hide' : 'invalid'}
                />
              </label>
              <Input
                type='email'
                id='email'
                ref={emailRef}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? 'false' : 'true'}
                aria-describedby='uidnote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id='uidnote'
                className={
                  EmailFocus && email && !validEmail
                    ? 'instructions'
                    : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must begin with a letter a valid email.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

              <label htmlFor='password'>
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? 'hide' : 'invalid'}
                />
              </label>
              <Input
                type='password'
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby='pwdnote'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id='pwdnote'
                className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{' '}
                <span aria-label='exclamation mark'>!</span>{' '}
                <span aria-label='at symbol'>@</span>{' '}
                <span aria-label='hashtag'>#</span>{' '}
                <span aria-label='dollar sign'>$</span>{' '}
                <span aria-label='percent'>%</span>
              </p>

              <label htmlFor='confirm_pwd'>
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                />
              </label>
              <Input
                type='password'
                id='confirm_pwd'
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? 'false' : 'true'}
                aria-describedby='confirmnote'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id='confirmnote'
                className={
                  matchFocus && !validMatch ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>

              <Button
                disabled={!validName || !validPwd || !validMatch ? true : false}
                type={'submit'}
              >
                Sign Up
              </Button>
            </form>
            <p>
              Already registered?
              <br />
              <span className='line'>
                <Link to='/'>Sign In</Link>
              </span>
            </p>
          </section>
        </Box>
      )}
    </>
  );
};

export default Register;
