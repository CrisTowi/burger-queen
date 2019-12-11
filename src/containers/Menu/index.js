// Libraries
import React from 'react'
import { Grid } from '@material-ui/core';

// Components
import MenuItem from '../../components/MenuItem';

const Menu = ({ menuToShow, handleAddToOrder}) => {
  return (
    <Grid container spacing={3}>
      { menuToShow.map((menuItem) => (
        <Grid item xs={2}>
          <MenuItem {...menuItem} onAddToOrder={handleAddToOrder} />
        </Grid>
      )) }
    </Grid>
  )
}

export default Menu;
