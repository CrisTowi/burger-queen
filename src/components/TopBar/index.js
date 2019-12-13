// Libraries
import React from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Styles
import './index.scss';

const TopBar = ({ onClickOrderButton, orderCount, location: { pathname } }) => {
  /**
   * Logout the user and redirect them to the login page
   */
  const handleLogout = () => {
    firebase.auth().signOut();
    window.location.href = '/login';
  }

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
        <div className="logout-button" onClick={handleLogout}>
          <Typography variant="h6" noWrap>
            Cerrar sesión
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(TopBar);
