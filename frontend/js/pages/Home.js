import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React from 'react';

import BarChart from './bar_chart';
import PieChart from './pie_chart';
import Table from './table';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      loading: true,
    };
  }

  componentDidMount = () => {
    this.fetchExpenses();
  };

  fetchExpenses = () => {
    axios.get('/api-v1/expenses/').then((resp) => {
      this.setState({
        loading: false,
        expenses: resp.data.results,
      });
      return null;
    });
  };

  render = () => {
    const { loading, expenses } = this.state;

    if (loading)
      return (
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '50px' }}>
              <CircularProgress />
            </Grid>
          </Grid>
        </Container>
      );

    return (
      <Container maxWidth="lg">
        <Typography gutterBottom style={{ margin: '30px 0' }} variant="h5">
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={3} xs={12}>
            <Card>
              <CardContent>
                <PieChart expenses={expenses} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={9} xs={12}>
            <Card>
              <CardContent>
                <BarChart expenses={expenses} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Table expenses={expenses} />
          </Grid>
        </Grid>
      </Container>
    );
  };
}

export default Home;
