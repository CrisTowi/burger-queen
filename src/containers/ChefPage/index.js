// Libraries
import React from 'react';
import firebase from 'firebase';


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

  fetchOrders = async () => {
    const response = await firebase.database().ref('/orders').once('value');

    this.setState({
      orders: response.val(),
    });
  }

  fetchAttendedOrders = async () => {
    const response = await firebase.database().ref('/attended_orders').once('value');

    this.setState({
      attendedOrders: response.val(),
    });
  }

  handleAttendOrder = async (order) => {
    const { orders } = this.state;
    delete orders[order.id];

    await firebase.database().ref('/attended_orders').push(order);
    await firebase.database().ref('/orders').set(orders);

    await this.fetchOrders();
    await this.fetchAttendedOrders();
  }

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

export default ClientPage;
