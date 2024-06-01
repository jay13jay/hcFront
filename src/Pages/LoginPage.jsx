import { PropTypes } from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Services/AuthContext.jsx';

function LoginPage({ apiURL }) {
  const loginPath = "/users/login";
  const loginURL = apiURL + loginPath;
  const { setUser, setToken } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');
  const [retData, setRetData] = useState('');
  const navigate = useNavigate();

  const handleLoginData = (e) => {
    e.preventDefault();  // Prevent the default form submission
    setData(JSON.stringify({
      username: username,
      password: password
    }));
  };

  useEffect(() => {
    document.title = "x/Login";
  }, []);

  useEffect(() => {
    async function postData() {
      setIsLoading(true);
      try {
        setError('');
        const res = await fetch(loginURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        });
        console.log("Response:", res);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const d = await res.json();
        console.log("Response JSON:", d);

        if (d.status === "success") {
          console.log("Setting user and token:", d.data);
          setUser(username);  // set the username you tried to login with
          setToken(d.data);   // set the token from the response
          setRetData(d);
          setData('');
          setError('');
          navigate('/chat');
        } else {
          throw new Error(d.message || "Login failed");
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
        setData('');
      }
    }

    if (data !== '') {
      postData();
    }
  }, [loginURL, navigate, data, setUser, setToken, username]);

  return (
    <Container>
      <h1>SIGN IN</h1>
      <form onSubmit={handleLoginData}>
        <label>
          <input
            value={username}
            placeholder='Enter your username'
            onChange={(e) => setUsername(e.target.value)}
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
        <Stack>
          <button className='h-submit' type="submit">Login</button>
          <Link to="/register">Create Account</Link>
        </Stack>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {retData && <pre>{JSON.stringify(retData, null, 2)}</pre>}
    </Container>
  );
}

LoginPage.propTypes = {
  apiURL: PropTypes.string.isRequired,
};

export default LoginPage;
