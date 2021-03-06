// Libraries
import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

// Styles
import './index.scss';

const OrderHistory = ({ isOpen, attendedOrders, onCloseOrderHistory }) => {
  const componentAttendedOrders = [];

  // Takes the attended orders object and in a for loop
  // creates a list of List items to show as components
  for (let key in attendedOrders) {
    componentAttendedOrders.push(
      <ListItem key={`attended-order-item-${key}`} button className={'drawer-item'}>
        <ListItemText
          primary={`Orden de ${attendedOrders[key].client} - ${attendedOrders[key].createdAt}`} />
      </ListItem>
    );
  }

  return (
    <Drawer
      className={'drawer'}
      variant="persistent"
      anchor="right"
      open={isOpen} >
        <div className="drawer-header">
          <div className="drawer-title">
            Historial de ordenes atendidas
          </div>
          <div className="drawer-header-icon" onClick={onCloseOrderHistory}>
            <CloseIcon />
          </div>
        </div>
        <List>
          {componentAttendedOrders}
        </List>
    </Drawer>
  )
}

export default OrderHistory;
