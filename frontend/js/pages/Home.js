import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React from 'react';
import moment from 'moment-timezone';
import { map } from 'lodash';
import { stringify } from 'querystring';

import BarChart from './bar_chart';
import PieChart from './pie_chart';
import Table from './table';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      loadingExpenses: true,

      users: [],
      loadingUsers: true,

      categories: [],
      loadingCategories: true,

      filters: {
        user_ids: [],
        category_ids: [],
        date_from: moment().tz('America/Toronto').startOf('month').format(),
        date_to: moment().tz('America/Toronto').format(),
        is_settled: false,
      }
    };
  }

  componentDidMount = () => {
    this.fetchUsers();
    this.fetchCategories();
  };

  componentDidUpdate = () => {
    const { loadingUsers, loadingCategories, loadingExpenses } = this.state;
    if (!loadingUsers && !loadingCategories && loadingExpenses) {
      this.fetchExpenses();
    }
  }

  fetchUsers = () => {
    axios.get('/api-v1/users/').then((resp) => {
      this.setState({
        users: resp.data.results,
        loadingUsers: false,
        filters: {
          ...this.state.filters,
          user_ids: map(resp.data.results, 'id'),
        },
      });
      return null;
    });
  };

  fetchCategories = () => {
    axios.get('/api-v1/expenses/categories/').then((resp) => {
      this.setState({
        categories: resp.data.results,
        loadingCategories: false,
        filters: {
          ...this.state.filters,
          category_ids: map(resp.data.results, 'id'),
        },
      });
      return null;
    });
  };

  fetchExpenses = () => {
    const { filters } = this.state;
    const url = `/api-v1/expenses/?${stringify(filters)}`;
    axios.get(url).then((resp) => {
      this.setState({
        expenses: resp.data.results,
        loadingExpenses: false,
      });
      return null;
    });
  };

  render = () => {
    const {
      expenses,
      loadingExpenses,
      users,
      loadingUsers,
      categories,
      loadingCategories,
    } = this.state;

    console.log(users)
    console.log(categories)

    const isLoading = loadingExpenses || loadingUsers || loadingCategories;

    if (isLoading)
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
