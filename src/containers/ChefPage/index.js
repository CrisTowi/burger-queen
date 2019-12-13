// Libraries
import React from 'react';
import firebase from 'firebase';
import { withSnackbar } from 'notistack';

// Components
import TopBar from '../../components/TopBar';
import ChefOrders from '../../components/ChefOrders';

// Containers
import OrderHistory from '../OrderHistory';

class ClientPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      orders: {},
      attendedOrders: {},
      isOrderHistoryOpen: false,
    };
  }

  componentWillMount(){
    this.fetchOrders();
    this.fetchAttendedOrders();
  }

  /**
   * Fetch orders from firebase database service and set state
   *
   * @memberof ClientPage
   */
  fetchOrders = async () => {
    const response = await firebase.database().ref('/orders').once('value');

    this.setState({
      orders: response.val(),
    });
  }

  /**
   * Fetch attended orders from firebase database service and set state
   *
   * @memberof ClientPage
   */
  fetchAttendedOrders = async () => {
    const response = await firebase.database().ref('/attended_orders').once('value');

    this.setState({
      attendedOrders: response.val(),
    });
  }

  /**
   * Triggers attend order function to set data in database and call the fetch
   * function
   *
   * @memberof ClientPage
   */
  handleAttendOrder = async (order) => {
    const { enqueueSnackbar } = this.props;

    try {      
      const { orders } = this.state;
      delete orders[order.id];
  
      await firebase.database().ref('/attended_orders').push(order);
      await firebase.database().ref('/orders').set(orders);
  
      await this.fetchOrders();
      await this.fetchAttendedOrders();

      enqueueSnackbar('¡Orden atentida con éxito!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error al atender la orden, intente más tarde.', { variant: 'success' });
    }
  }

  /**
   * Toggle order history visible component option
   *
   * @memberof ClientPage
   */
  toggleOrderSelectOpen = () => {
    this.setState((prevState) => {
      const { isOrderHistoryOpen } = prevState;

      return { isOrderHistoryOpen: !isOrderHistoryOpen };
    });
  }

  render() {
    const { orders, attendedOrders, isOrderHistoryOpen } = this.state;

    return (
      <>
        <TopBar onClickOrderButton={this.toggleOrderSelectOpen} />
        <ChefOrders
          onAttendOrder={this.handleAttendOrder}
          orders={orders} />
        <OrderHistory
          attendedOrders={attendedOrders}
          isOpen={isOrderHistoryOpen}
          onCloseOrderHistory={this.toggleOrderSelectOpen} />
      </>
    )
  }
}

export default withSnackbar(ClientPage);
