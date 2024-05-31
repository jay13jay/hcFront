import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

function RegisterPage({ username, setUsername}) {
  const apiURL = "http://localhost:3000/api/users/register";
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
        const res = await fetch(apiURL, {
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
          navigate('/chat');
        }
        setRetData(d);
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
  }, [navigate, data]);

  return (
    <Container>
      <h1>Create Account</h1>
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
        <button
          className='h-submit' 
          type="submit">Login</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {retData && <pre>{JSON.stringify(retData, null, 2)}</pre>}
    </Container>
  );
}

RegisterPage.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
};

export default RegisterPage;
