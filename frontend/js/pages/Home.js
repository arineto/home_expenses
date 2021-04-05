import React from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from './table';
import PieChart from './pie_chart';
import BarChart from './bar_chart';
import { Pie } from 'recharts';

class Home extends React.Component {
  state = {
    expenses: [],
    loading: true
  }

  componentDidMount = () => {
    this.fetchExpenses();
  }

  fetchExpenses = () => {
    axios.get('/api-v1/expenses/').then((resp) => {
      this.setState({
        loading: false,
        expenses: resp.data.results,
      });
    });
  }

  render = () => {
    const { loading, expenses } = this.state;

    if (loading) return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} style={{textAlign: "center", marginTop: "50px"}}>
            <CircularProgress />
          </Grid>
        </Grid>
      </Container>
    );

    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <PieChart expenses={expenses} />
          </Grid>
          <Grid item xs={8}>
            <BarChart expenses={expenses} />
          </Grid>
          <Grid item xs={12}>
            <Table expenses={expenses} />
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default Home;
