// Libraries
import React from 'react';
import firebase from 'firebase';
import { Tabs, Tab, Paper } from '@material-ui/core';

// Containers
import Menu from '../Menu';
import Order from '../Order';

// Components
import TopBar from '../../components/TopBar';

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
      loading: false,
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

  handleRegisterOrder = async () => {
    const { orderState } = this.state;
    this.setState({ loading: true });

    try {
      await firebase.database().ref('/orders').push({
        client: 1,
        order: orderState,
      });

      this.setState({
        currentTab: 0,
        orderState: [],
        isOrderStateOpen: false,
        loading: false,
      });
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { currentTab, orderState, isOrderStateOpen, loading } = this.state;
    let menuToShow;

    if (currentTab === 0) {
      menuToShow = breakfastMenu;
    } else {
      menuToShow = restOfheDayMenu;
    }

    return (
      <>
        <TopBar
          orderCount={orderState.length}
          onClickOrderButton={this.toggleOrderSelectOpen} />
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
          loading={loading}
          isOpen={isOrderStateOpen}
          orderState={orderState}
          onCloseOrder={this.toggleOrderSelectOpen}
          onRemoveItem={this.handleRemoveOrderItem}
          onRegisterOrder={this.handleRegisterOrder} />
      </>
    )
  }
}

export default ClientPage;
