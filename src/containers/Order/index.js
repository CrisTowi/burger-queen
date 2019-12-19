// Libraries
import React, { useState } from 'react';
import { withSnackbar } from 'notistack';
import firebase from 'firebase';
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
  onCommentsChange,
  enqueueSnackbar,
  clientName,
  loading, }) => {
  let totalPrice = 0;
  const [ couponKey, setCouponKey ] = useState('');
  const [ coupon, setCoupon ] = useState(null);

  
  const handleValidateCoupon = async () => {
    let foundCoupon = null;
    const response = await firebase.database().ref('/coupons').once('value');
    const coupons = response.val(); 

    for (let key in coupons) {
      if (coupons[key].key === couponKey) {
        foundCoupon = key;
      }
    }

    if (foundCoupon) {
      setCoupon({
        ...coupons[foundCoupon],
        id: foundCoupon
      });
      enqueueSnackbar("Cupón agregado.", { variant: 'success' });
    } else {
      enqueueSnackbar("Cupón no válido. Trata con algún otro.", { variant: 'error' });
      setCouponKey('');
      setCoupon(null);
    }

  };

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
          {coupon ? ` - ${(totalPrice * (0.01 * coupon.discount)).toFixed(2)} = ${(totalPrice - (totalPrice * (0.01 * coupon.discount)).toFixed(2))}` : ''}
        </Typography>
        <TextField
          onChange={onClientNameChange}
          type="text"
          label="Nombre del cliente"
          variant="outlined"
          style={{ width: '100%', marginBottom: '15px' }} />
        <TextField
          onChange={onCommentsChange}
          type="text-area"
          label="¿Algún comentario o nota para el chef?"
          variant="outlined"
          multiline
          rows="4"
          style={{ width: '100%', marginBottom: '15px' }} />

        <TextField
          onChange={(e) => setCouponKey(e.target.value)}
          type="text"
          label="Introduce una clave de cupón"
          variant="outlined" />
        <Button
          style={{ marginBottom: '15px' }}
          variant="contained"
          color="default"
          disabled={!couponKey || couponKey.length < 3}
          onClick={handleValidateCoupon}>
          Validar cupón
        </Button>

        <Button
          disabled={!clientName || orderState.length === 0 || loading}
          variant="contained"
          color="primary"
          onClick={() => { onRegisterOrder(coupon) }}>
          Registrar orden
        </Button>
    </Drawer>
  )
}

export default withSnackbar(Order);
