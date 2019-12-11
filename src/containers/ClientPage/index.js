// Libraries
import React from 'react'
import { Tabs, Tab, Paper, Grid } from '@material-ui/core';

// Components
import MenuItem from '../../components/MenuItem';

// Utils
import { breakfastMenu, restOfheDayMenu } from '../../utils/menus';

class ClientPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0
    };
  }

  handleChange = (_, newTab) => {
    this.setState({
      currentTab: newTab
    });
  }

  render() {
    const { currentTab } = this.state;
    let menuToShow;

    if (currentTab === 0) {
      menuToShow = breakfastMenu;
    } else {
      menuToShow = restOfheDayMenu;
    }

    return (
      <>
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
        <Grid container spacing={3}>
          { menuToShow.map((menuItem) => (
            <Grid item xs={3}>
              <MenuItem {...menuItem} />
            </Grid>
          )) }
        </Grid>
      </>
    )
  }
}

export default ClientPage;
