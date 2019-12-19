// Libraries
import React, { useState } from 'react'
import {
  Typography,
  Button,
  TextField,
  Switch,
  Modal,
} from '@material-ui/core';

const CouponsForm = ({ open, onClose, onCreateCoupon }) => {
  const [singleUse, setSingleUse] = useState(false);
  const [key, setKey] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleClick = () => {
    onCreateCoupon({
      key,
      singleUse,
      discount,
    });

    setSingleUse(false);
    setKey(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >       
      <div className="modal-body">
        <Typography>Agregar un nuevo cupón</Typography>
        <TextField
          onChange={(e) => setKey(e.target.value)}
          type="text"
          label="Clave"
          variant="outlined"
          style={{ width: '100%', marginBottom: '15px', marginTop: '15px' }} />
        <TextField
          onChange={(e) => setDiscount(Number(e.target.value))}
          type="number"
          label="Porcentaje de descuento (%)"
          variant="outlined"
          style={{ width: '100%', marginBottom: '15px', marginTop: '15px' }} />
        <Typography>
          ¿Un solo uso?
        </Typography>
        <Switch
          checked={singleUse}
          onChange={() => setSingleUse(!singleUse)}
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }} />
        <div style={{ width: '100%' }}>
          <Button
            onClick={handleClick}
            style={{ width: '100%' }}
            variant="contained"
            disabled={!key || key.length < 3}
            color="primary">
            Agregar cupón
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CouponsForm;
