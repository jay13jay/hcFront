import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

function LoginPage() {
  // const apiURL = "localhost:3000/login"
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState('{}');

  const tempData = () => {
    setPostData(JSON.stringify({
      username: username,
      password: password
    }));
  }
  
  useEffect(() => {
   document.title = "x/Login"
  }, []);

  useEffect(() => {
    // try to login the user
    async function postData() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          apiURL + "&s=" + query,
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
        setError('');
        // await new Promise(r => setTimeout(r, 1500));
        // timedWait(1500);
        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
        setError(err.message);
        }
        setIsLoading(false);
      }
    }
    if (query) {
      setError('');
      postData();
    }

  }, [query]);

  return (
    <Container >
      <h1>Login Page</h1>
      <form>
        <label>
          <input
            value={username}
            placeholder='Enter your username'
            type="text" 
            name="username" 
          />
        </label>
        <br />
        <label>
          <input
            value={password}
            placeholder='Enter your password'
            type="password"
            name="password"
          />
        </label>
        <br />
        <button className='h-submit' type="submit">Login</button>
      </form>
    </Container>
  );
}

export default LoginPage;