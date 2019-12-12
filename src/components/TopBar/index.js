// Libraries
import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const TopBar = ({ onClickOrderButton, orderCount, location: { pathname } }) => {
  return (
    <AppBar
      position="fixed"
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Burger Qeen
        </Typography>
        {
          pathname === '/client' && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={onClickOrderButton}
              >
                <div className="order-button-container">
                  <div className="order-counter">
                  <Typography noWrap>
                    {orderCount}
                  </Typography>
                  </div>
                  <MenuIcon />
                </div>
            </IconButton>
          )
        }
        {
          pathname === '/chef' && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={onClickOrderButton}
              >
              <MenuIcon />
            </IconButton>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(TopBar);
