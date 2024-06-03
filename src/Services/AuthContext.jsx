import { PropTypes } from 'prop-types';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  user: '',
  setUser: () => {},
  token: '',
  setToken: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userID, setUserID] = useState(localStorage.getItem('userID') || '');

  useEffect(() => {
    localStorage.setItem('user', user);
  }, [user]);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);
  useEffect(() => {
    localStorage.setItem('userID', userID);
  }, [userID]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, userID, setUserID }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};