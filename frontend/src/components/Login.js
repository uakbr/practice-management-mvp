import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { AuthContext } from '../state/authContext';
import {
  Container,
  TextField,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing(8),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      login(response.data.user, response.data.token);
      history.push('/');
    } catch (error) {
      console.error('Login Error:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <Container className={classes.form}>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
          fullWidth
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;