import { PropTypes } from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 

import { AuthContext } from '../Services/AuthContext.jsx';

function RegisterPage({ apiURL}) {
  const registerPath = "/users/register";
  const registerURL = apiURL + registerPath;
  const { user, setUser, setToken } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');
  const [retData, setRetData] = useState('');
  const navigate = useNavigate();

  const handleLoginData = (e) => {
    e.preventDefault();  // Prevent the default form submission
    setData(JSON.stringify({
      username: user,
      password: password
    }));
    setIsLoading(true);
  };
  
  useEffect(() => {
    document.title = "x/Login";
  }, []);

  useEffect(() => {
    // Try to register the user
    async function postData() {
      console.log("Data: ", data);
      try {
        setError('');
        const res = await fetch(registerURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        });
        console.log(res);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const d = await res.json();
        if (d.Response === "False") {
          throw new Error(d.Error);
        }
        if (d.status == "success") {
          // console.log("sucessful registration... redirecting")
          navigate('/');
        }
        setRetData(d);
        setToken(d.data);
        setData('');
        setError('');
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }

    if (data !== '') {
      postData();
    }
  }, [navigate, data, registerURL, setToken]);

  return (
    <Container>
      <h1>Create Account</h1>
      <form onSubmit={handleLoginData}>
        <label>
          <input
            value={user}
            placeholder='Enter your username'
            onChange={(e) => setUser(e.target.value)}
            type="text" 
            name="username" 
          />
        </label>
        <br />
        <label>
          <input
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </label>
        <br />
        <Stack >
        <button
          className='h-submit' 
          type="submit">Create User</button>
          <Link to='/'>Already have a user?</Link>
        </Stack>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {retData && <pre>{JSON.stringify(retData, null, 2)}</pre>}
    </Container>
  );
}

RegisterPage.propTypes = {
  apiURL: PropTypes.string.isRequired,
};

export default RegisterPage;
