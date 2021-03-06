// Libraries
import React, { useState } from 'react'
import {
  Typography,
  Grid,
  Button,
  Modal, } from '@material-ui/core';

// Styles
import './index.scss';

const ChefOrders = ({ orders, onAttendOrder }) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  let componentOrders = [];

  // Go for each of the keys in the orders object and
  // creates a grid component with the orders for the chef
  // to attend
  for (let key in orders) {
    componentOrders.push(
      <Grid item md={2} sm={4} xs={12}>
        <div onClick={() => handleClickOrder({
          id: key,
          ...orders[key]
        })} className="chef-order-item">
          <div>
            Orden de {orders[key].client}
          </div>
          <div>
            {orders[key].createdAt}
          </div>
        </div>
      </Grid>
    );
  }

  /**
   * Triggered when a order is clicked and open the order
   * modal to show the items ordered from the menu to attend
   * @param {object} order 
   */
  const handleClickOrder = (order) => {
    setIsOrderModalOpen(true);
    setSelectedOrder(order);
  }

  /**
   * Triggered when the chef clicks the button pointing the order
   * has been attended
   */
  const handleAttendedOrder = async () => {
    await onAttendOrder(selectedOrder);
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  }

  return (
    <>
      <div style={{ marginTop: '65px', padding: '15px' }}>
        <Typography>
          Pedidos pendientes
        </Typography>
        <Grid container spacing={3}>
          {componentOrders}
        </Grid>
        <Modal
          open={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
        >
          {selectedOrder && (         
            <div className="modal-body">
              <Typography>Orden de {selectedOrder.client}</Typography>
              {
                selectedOrder.order.map((item, index) => (
                  <div key={`order-item-${index}`} style={{ display: 'block', width: '100%', margin: '15px' }}>
                    <Typography>{item.name}</Typography>
                  </div>
                ))
              }
              {
                selectedOrder.comments && (
                  <div className={'modal-body-comments'}>
                    <Typography>Notas del cliente: </Typography>
                    <p className={'modal-body-comments-p'}>{selectedOrder.comments}</p>
                  </div>
                )
              }
              <div style={{ width: '100%' }}>
                <Button
                  onClick={handleAttendedOrder}
                  style={{ width: '100%' }}
                  variant="contained"
                  color="primary">
                  ¡Atendida!
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  )
}

export default ChefOrders;
