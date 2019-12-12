// Libraries
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

// Styles
import './index.scss';

const OrderHistory = ({ isOpen, attendedOrders, onCloseOrderHistory }) => {
  const componentAttendedOrders = [];
  for (let key in attendedOrders) {
    componentAttendedOrders.push(
      <ListItem key={`attended-order-item-${key}`} button className={'drawer-item'}>
        <ListItemText
          primary={`${attendedOrders[key].id}`} />
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
