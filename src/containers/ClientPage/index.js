// Libraries
import React from 'react';
import firebase from 'firebase';
import { Tabs, Tab, Paper } from '@material-ui/core';
import { withSnackbar } from 'notistack';

// Containers
import Menu from '../Menu';
import Order from '../Order';

// Components
import TopBar from '../../components/TopBar';

// Utils
import { breakfastMenu, restOfheDayMenu } from '../../utils/menus';
import { formatDate } from '../../utils/format';

// Styles
import './index.scss';

class ClientPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
      orderState: [],
      clientName: null,
      clientComments: null,
      isOrderStateOpen: false,
      loading: false,
    };
  }

  /**
   * Triggered when user clicks on a new tab and set it as
   * the current active tab
   *
   * @memberof ClientPage
   */
  handleTabChange = (_, newTabIndex) => {
    this.setState({
      currentTab: newTabIndex,
    });
  }

  /**
   * Triggered when user clicks on a new menu item for the 
   * order
   * 
   * @memberof ClientPage
   */
  handleAddToOrder = (item) => {
    this.setState((prevState) => {
      const { orderState } = prevState;
      orderState.push(item);

      return { orderState };
    })
  }

  /**
   * Handles the toggle logic to hide and show the order
   * status and show it if it is hidden and hides it if it 
   * is visible
   *
   * @memberof ClientPage
   */
  toggleOrderSelectOpen = () => {
    this.setState((prevState) => {
      const { isOrderStateOpen } = prevState;

      return { isOrderStateOpen: !isOrderStateOpen };
    });
  }

  /**
   * Triggered when user clicks on the delete item from an order
   * and delete it from the order state
   *
   * @memberof ClientPage
   */
  handleRemoveOrderItem = (index) => {
    this.setState((prevState) => {
      const { orderState } = prevState;

      return { orderState: orderState.filter((_, i) => i !== index) };
    });
  }

  /**
   * Triggered when the user wants to register a new order and set the state
   * to an initial state
   *
   * @memberof ClientPage
   */
  handleRegisterOrder = async () => {
    const { orderState, clientName, clientComments } = this.state;
    const { enqueueSnackbar } = this.props;
    this.setState({ loading: true });

    try {
      await firebase.database().ref('/orders').push({
        createdAt: formatDate(new Date()),
        client: clientName,
        comments: clientComments,
        order: orderState,
      });

      this.setState({
        currentTab: 0,
        orderState: [],
        isOrderStateOpen: false,
        loading: false,
        clientName: null,
        clientComments: null,
      }, () => {
        enqueueSnackbar("¡Order agregada con éxito!", { variant: 'success' });
      });
    } catch (error) {
      enqueueSnackbar("Error al agregar la orden, intente más tarde.", { variant: 'error' });
    }
  }

  /**
   * Triggered when the client sets their name in the order
   *
   * @memberof ClientPage
   */
  handleClientNameChange = async (e) => {
    this.setState({ clientName: e.target.value })
  }

  /**
   * Triggered when the client sets their comments in the order
   *
   * @memberof ClientPage
   */
  handleCommentsChange = async (e) => {
    this.setState({ clientComments: e.target.value })
  }

  render() {
    const { currentTab, orderState, isOrderStateOpen, clientName, loading } = this.state;
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
            onChange={this.handleTabChange}
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
          clientName={clientName}
          onClientNameChange={this.handleClientNameChange}
          onCommentsChange={this.handleCommentsChange}
          onCloseOrder={this.toggleOrderSelectOpen}
          onRemoveItem={this.handleRemoveOrderItem}
          onRegisterOrder={this.handleRegisterOrder} />
      </>
    )
  }
}

export default withSnackbar(ClientPage);
