// Login component for user authentication
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { AuthContext } from '../state/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const { token } = response.data;
      // Fetch user data if needed
      login(null, token);
      history.push('/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
      // Handle error (e.g., show notification)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;