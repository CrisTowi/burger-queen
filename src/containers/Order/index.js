// Libraries
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

// Styles
import './index.scss';

const Order = ({ isOpen, orderState, onRemoveItem, onCloseOrder }) => {
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
            
            if (orderItem.additionals) {
              orderItem.additionals.reduce((prevVal, additional) => {
                prevVal += `${additional.name} (x${additional.amount}) `;
  
                return prevVal;
              }, '');
            }

            return (
              <ListItem button className={'drawer-item'}>
                <ListItemText
                  primary={`${orderItem.name} ${additionalString}`} />
                <DeleteIcon onClick={onRemoveItem.bind(null, index)} />
              </ListItem>
            );
          }) }
        </List>
    </Drawer>
  )
}

export default Order;
