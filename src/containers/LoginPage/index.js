// Libraries
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@material-ui/core';
import firebase from 'firebase'
import { SnackbarProvider, useSnackbar } from 'notistack';


const LoginPageComponent = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Triggered when user clicks on the login button and call the
   * function to authenticate via firebase and if everything when well redirect
   * to the client page
   */
  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      window.location.href = '/client';
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  /**
   * Triggered when user updates the email addres in the text field
   * and set the new state
   * 
   * @param {object} e 
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  /**
   * Triggered when user updates the password in the text field
   * and set the new state
   * 
   * @param {object} e 
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className="modal-body">
      <Typography variant="h5">
        Iniciar Sesión
      </Typography>
      <div className="modal-text-form-container">
        <TextField
          onChange={handleEmailChange}
          type="email"
          label="Correo electrónico"
          variant="outlined"
          style={{ width: '100%' }} />
      </div>
      <div className="modal-text-form-container">
        <TextField
          onChange={handlePasswordChange}
          type="password"
          label="Contraseña"
          variant="outlined"
          style={{ width: '100%' }} />
      </div>
      <div className="modal-text-form-container">
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Ingresar
        </Button>
        <div style={{ marginTop: '15px' }}>
          <Link to='/forgot-password'>¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  )
}

const LoginPage = () => (
  <SnackbarProvider>
    <LoginPageComponent />
  </SnackbarProvider>
);

export default LoginPage;
