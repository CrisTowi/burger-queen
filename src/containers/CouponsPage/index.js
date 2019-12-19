// Libraries
import React from 'react';
import firebase from 'firebase';
import { withSnackbar } from 'notistack';
import {
  Button,
} from '@material-ui/core';

// Components
import TopBar from '../../components/TopBar';
import CouponsList from '../../components/CouponsList';
import CouponsForm from '../../components/CouponsForm';

// Styles
import './index.scss';

class CouponsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      coupons: {},
      isCouponModalOpen: false,
    };
  }

  componentWillMount(){
    this.fetchCoupons();
  }

  /**
   * Fetch coupons from firebase database service and set state
   *
   * @memberof CouponsPage
   */
  fetchCoupons = async () => {
    const response = await firebase.database().ref('/coupons').once('value');

    this.setState({
      coupons: response.val(),
    });
  }

  /**
   * Create a new coupon on firebase and fetch coupons with it finishes
   *
   * @memberof CouponsPage
   */
  handleCreateCoupon = async ({ key, singleUse, discount }) => {
    const { enqueueSnackbar } = this.props;

    try {      
      await firebase.database().ref('/coupons').push({
        key,
        singleUse,
        discount,
        uses: 0,
        active: true,
      });

      this.setState({ isCouponModalOpen: false }, () => {
        this.fetchCoupons();
        enqueueSnackbar("Cupón agregado con éxito!", { variant: 'success' });
      });
    } catch (error) {
      enqueueSnackbar("Error al agregar el cupón, intente más tarde.", { variant: 'error' });
    }
  }

  /**
   * Handle 
   *
   * @memberof CouponsPage
   */
  handleCouponModalOpen = (isCouponModalOpen) => {
    this.setState({ isCouponModalOpen });
  }

  /**
   * Handle delete function triggered when user clicks on the delete button
   * on each of the coupons
   *
   * @memberof CouponsPage
   */
  handleDeleteCoupon = async (coupon) => {
    const { enqueueSnackbar } = this.props;
    const { coupons } = this.state;
    delete coupons[coupon];

    try {
      await firebase.database().ref('/coupons').set(coupons);
      this.fetchCoupons();
      enqueueSnackbar("Cupón borrado con éxito!", { variant: 'success' });
    } catch (error) {
      enqueueSnackbar("Error al borrar el cupón, intente más tarde.", { variant: 'error' });
    }
  }

  render() {
    const { coupons, isCouponModalOpen } = this.state;

    return (
      <>
        <TopBar/>
        <CouponsList
          onDeleteCoupon={this.handleDeleteCoupon}
          coupons={coupons} />
        <div className="open-coupon-button">
          <Button
            onClick={this.handleCouponModalOpen.bind(null, true)}
            style={{ width: '100%' }}
            variant="contained"
            color="primary">
            Agregar cupón
          </Button>
        </div>
        <CouponsForm
          onCreateCoupon={this.handleCreateCoupon}
          open={isCouponModalOpen}
          onClose={this.handleCouponModalOpen.bind(null, false)} />
      </>
    )
  }
}

export default withSnackbar(CouponsPage);
