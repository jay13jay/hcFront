import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 


function LoginPage({ username, setUsername, handleSetToken, apiURL}) {
  const loginPath = "/users/login";
  const loginURL = apiURL + loginPath;
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
    // Try to register the user
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
        console.log(res);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const d = await res.json();
        if (d.Response === "False") {
          throw new Error(d.Error);
        }
        setIsLoading(false);

        if (d.status == "success") {
          handleSetToken(d.data)
          setRetData(d);
          setData('');
          setError('');
          navigate('/chat');
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
  }, [loginURL, navigate, data, handleSetToken]);

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
        <Stack >
        <button
          className='h-submit' 
          type="submit">Login</button>
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
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  apiURL: PropTypes.string.isRequired,
  handleSetToken: PropTypes.func.isRequired,
};

export default LoginPage;
