// Libraries
import React from 'react'
import { Tabs, Tab, Paper, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Containers
import Menu from '../Menu';
import Order from '../Order';

// Utils
import { breakfastMenu, restOfheDayMenu } from '../../utils/menus';

// Styles
import './index.scss';

class ClientPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
      orderState: [],
      isOrderStateOpen: false,
    };
  }

  handleChange = (_, newTab) => {
    this.setState({
      currentTab: newTab
    });
  }

  handleAddToOrder = (item) => {
    this.setState((prevState) => {
      const { orderState } = prevState;
      orderState.push(item);

      return { orderState };
    })
  }

  toggleOrderSelectOpen = () => {
    this.setState((prevState) => {
      const { isOrderStateOpen } = prevState;

      return { isOrderStateOpen: !isOrderStateOpen };
    });
  }

  handleRemoveOrderItem = (index) => {
    this.setState((prevState) => {
      const { orderState } = prevState;

      return { orderState: orderState.filter((_, i) => i !== index) };
    });
  }

  render() {
    const { currentTab, orderState, isOrderStateOpen } = this.state;
    let menuToShow;

    if (currentTab === 0) {
      menuToShow = breakfastMenu;
    } else {
      menuToShow = restOfheDayMenu;
    }

    return (
      <>
        <AppBar
          position="fixed"
        >
          <Toolbar>
            <Typography variant="h6" noWrap>
              Burger Qeen
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={this.toggleOrderSelectOpen}
              >
                <div className="order-button-container">
                  <div className="order-counter">
                  <Typography noWrap>
                    {orderState.length}
                  </Typography>
                  </div>
                  <MenuIcon />
                </div>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Paper style={{ marginTop: '65px' }} square>
          <Tabs
            value={currentTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Desayuno" />
            <Tab label="Almuerzo y cena" />
          </Tabs>
        </Paper>
        <Menu
          menuToShow={menuToShow}
          handleAddToOrder={this.handleAddToOrder} />
        <Order
          onCloseOrder={this.toggleOrderSelectOpen}
          isOpen={isOrderStateOpen}
          orderState={orderState}
          onRemoveItem={this.handleRemoveOrderItem} />
      </>
    )
  }
}

export default ClientPage;
