// Libraries
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  TextField,
} from '@material-ui/core';

// Styles
import './index.scss';

const Order = ({
  isOpen,
  orderState,
  onRemoveItem,
  onCloseOrder,
  onRegisterOrder,
  onClientNameChange,
  clientName,
  loading, }) => {
  let totalPrice = 0;

  return (
    <Drawer
      className={'drawer'}
      variant="persistent"
      anchor="right"
      open={isOpen} >
        <div className="drawer-header">
          <div className="drawer-title">
            Orden
          </div>
          <div className="drawer-header-icon" onClick={onCloseOrder}>
            <CloseIcon />
          </div>
        </div>
        <List>
          { orderState.map((orderItem, index) => {
            const additionalString = '';
            let price = orderItem.price;
            
            if (orderItem.additionals) {
              orderItem.additionals.reduce((prevVal, additional) => {
                prevVal += `${additional.name} (x${additional.amount}) `;
                price += 1;
                
                return prevVal;
              }, '');
            }

            totalPrice += price;

            return (
              <ListItem key={`order-item-${index}`} button className={'drawer-item'}>
                <ListItemText
                  primary={`${orderItem.name} ${additionalString} $${price}`} />
                <DeleteIcon onClick={onRemoveItem.bind(null, index)} />
              </ListItem>
            );
          }) }
        </List>
        <Typography style={{ padding: '15px' }}>
          Total: ${totalPrice}
        </Typography>
        <TextField
          onChange={onClientNameChange}
          type="text"
          label="Nombre del cliente"
          variant="outlined"
          style={{ width: '100%', marginBottom: '15px' }} />
        <Button disabled={!clientName || orderState.length === 0 || loading} variant="contained" color="primary" onClick={onRegisterOrder}>
          Registrar orden
        </Button>
    </Drawer>
  )
}

export default Order;
