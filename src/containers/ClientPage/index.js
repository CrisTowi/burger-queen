// Libraries
import React from 'react'
import { Tabs, Tab, Paper } from '@material-ui/core';

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
        <div
          onClick={this.toggleOrderSelectOpen}
          className="menu-status-button">
          
        </div>
        <Paper square>
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
          isOpen={isOrderStateOpen}
          orderState={orderState}
          onRemoveItem={this.handleRemoveOrderItem} />
      </>
    )
  }
}

export default ClientPage;
