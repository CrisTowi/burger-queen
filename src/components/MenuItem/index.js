// Libraries
import React, { useState } from 'react';
import { Modal, TextField, Button } from '@material-ui/core';

// Styles
import './index.scss';

const MenuItem = ({ name, price, type, onAddToOrder }) => {
  const [isAdditionalsModalOpen, setIsAdditionalsModalOpen] = useState(false);
  const [eggPieces, setEggPieces] = useState(0);
  const [cheesePieces, setCheesePieces] = useState(0);

  const handleAddMenuItem = () => {
    if (type && type === 'withAdditionals') {
      setIsAdditionalsModalOpen(true);
    } else {
      onAddToOrder({
        name: name,
        price: price,
      });
    }
  }

  const handleAddMenuItemWithAdditionals = () => {
    const additionals = [];

    if (eggPieces) {
      additionals.push({
        name: 'Huevo',
        price: 1,
        amount: eggPieces,
      });
    }

    if (cheesePieces) {
      additionals.push({
        name: 'Queso',
        price: 1,
        amount: cheesePieces,
      });
    }

    onAddToOrder({
      name: name,
      price: price,
      additionals,
    });
    setIsAdditionalsModalOpen(false);
    setEggPieces(0);
    setCheesePieces(0);
  }

  return (
    <>
      <div onClick={handleAddMenuItem} className="menu-item">
        <div className="menu-item-name">
          {name}
        </div>
        <div className="menu-item-price">
          ${price}
        </div>
      </div>
      <Modal
        open={isAdditionalsModalOpen}
        onClose={() => setIsAdditionalsModalOpen(false)}
      >
        <div className="modal-body">
          <div className="modal-text-form-container">
            <TextField
              onChange={(e) => setCheesePieces(Number(e.target.value))}
              type="number"
              label="¿Cuántas piezas de queso extra quieres ($1/cu)?"
              variant="outlined"
              style={{ width: '100%' }} />
          </div>
          <div className="modal-text-form-container">
            <TextField
              onChange={(e) => setEggPieces(Number(e.target.value))}
              type="number"
              label="¿Cuántas piezas de huevo extra quieres ($1/cu)?"
              variant="outlined"
              style={{ width: '100%' }} />
          </div>
          <div className="modal-text-form-container">
            <Button variant="contained" color="primary" onClick={handleAddMenuItemWithAdditionals}>
              Agregar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );  
};

export default MenuItem;
