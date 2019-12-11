// Libraries
import React from 'react'
import { Grid } from '@material-ui/core';

// Components
import MenuItem from '../../components/MenuItem';

const Menu = ({ menuToShow, handleAddToOrder}) => {
  return (
    <Grid style={{ padding: '15px' }} container spacing={3}>
      { menuToShow.map((menuItem) => (
        <Grid item md={2} sm={4} xs={12}>
          <MenuItem {...menuItem} onAddToOrder={handleAddToOrder} />
        </Grid>
      )) }
    </Grid>
  )
}

export default Menu;
