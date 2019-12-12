// Libraries
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { TextField, Button, Typography } from '@material-ui/core';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState(null);

  const handleEmailSend = async () => {
    await firebase.auth().sendPasswordResetEmail(email);
    window.location.href = '/login';
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div className="modal-body">
      <Typography variant="h5">
        Recuperar contraseña
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
        <Button variant="contained" color="primary" onClick={handleEmailSend}>
          Enviar instrucciones
        </Button>
        <div style={{ marginTop: '15px' }}>
          <Link to='/login'>{'< Regresar'}</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage;
