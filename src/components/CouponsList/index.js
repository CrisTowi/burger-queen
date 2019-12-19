// Libraries
import React from 'react'
import {
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

// Styles
// import './index.scss';

const CouponsList = ({ coupons, onDeleteCoupon }) => {
  let componentCoupons = [];

  // Go for each of the keys in the orders object and
  // creates a grid component with the orders for the chef
  // to attend
  for (let key in coupons) {
    componentCoupons.push(
      <Grid item md={2} sm={4} xs={12}>
        <div className="chef-order-item">
          <div>
            Clave: {coupons[key].key}
          </div>
          <div>
            Descuento: {coupons[key].discount}%
          </div>
          <div>
            Usado: {coupons[key].uses} {coupons[key].uses === 1 ? 'vez' : 'veces'}
          </div>
          <div>
            <Button
              onClick={() => onDeleteCoupon(key) }
              style={{ width: '100%' }}
              variant="contained"
              color="secondary">
              Borrar
            </Button>
          </div>
        </div>
      </Grid>
    );
  }

  return (
    <>
      <div style={{ marginTop: '65px', padding: '15px' }}>
        <Typography>
          Cupones generados
        </Typography>
        <Grid container spacing={3}>
          {componentCoupons}
        </Grid>
      </div>
    </>
  )
}

export default CouponsList;
