// Libraries
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@material-ui/core';
import firebase from 'firebase'


const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    window.location.href = '/client';
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

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

export default LoginPage;
