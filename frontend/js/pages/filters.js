import DateFnsUtils from '@date-io/moment';
import Checkbox from '@material-ui/core/Checkbox';
import { map, includes, pull } from 'lodash';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment-timezone';
import React from 'react';
import styled from 'styled-components';

const StyledPicker = styled(KeyboardDatePicker)`
  &&& input {
    font-size: 13px;
  }
  &&& svg {
    font-size: 18px;
  }
`;

const FiltersComponent = ({ filters, setFilters, users, categories }) => {
  const setIsSettled = () => {
    setFilters({
      ...filters,
      is_settled: !filters.is_settled,
    });
  };
  const setUsers = (id) => {
    let userIds = filters.user_ids;
    if (includes(userIds, id)) {
      pull(userIds, id);
    } else {
      userIds = [...userIds, id];
    }
    setFilters({
      ...filters,
      user_ids: userIds,
    });
  }
  const setCategories = (id) => {
    let categoryIds = filters.category_ids;
    if (includes(categoryIds, id)) {
      pull(categoryIds, id);
    } else {
      categoryIds = [...categoryIds, id];
    }
    setFilters({
      ...filters,
      category_ids: categoryIds,
    });
  }
  const setDateFrom = (value) => {
    setFilters({
      ...filters,
      date_from: value.startOf('day').format(),
    });
  }
  const setDateTo = (value) => {
    setFilters({
      ...filters,
      date_to: value.endOf('day').format(),
    });
  }
  return (
    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column' }}>
      <p style={{ fontSize: '14px' }}>Filters</p>
      <div style={{ marginBottom: '10px', fontSize: '13px' }}>
        <p
          style={{
            fontWeight: '10px',
            borderBottom: '1px solid rgb(61, 90, 128)',
            marginBottom: '0',
          }}
        >
          Date
        </p>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <StyledPicker
              disableToolbar
              variant="inline"
              format="DD/MM/YYYY"
              margin="normal"
              label="From"
              value={moment(filters.date_from)}
              onChange={setDateFrom}
              autoOk
              disableFuture
            />
            <StyledPicker
              disableToolbar
              variant="inline"
              format="DD/MM/YYYY"
              margin="normal"
              label="To"
              value={moment(filters.date_to)}
              onChange={setDateTo}
              autoOk
              disableFuture
              style={{fontSize: '13px'}}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <div style={{ marginBottom: '10px', fontSize: '13px' }}>
        <p style={{ fontWeight: '10px', borderBottom: '1px solid rgb(61, 90, 128)' }}>Users</p>
        {map(users, (user) => (
          <div
            key={user.id}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ width: '80%', fontWeight: '300' }}>{user.email}</div>
            <Checkbox
              checked={includes(filters.user_ids, user.id)}
              color="primary"
              onChange={() => setUsers(user.id)}
              style={{
                transform: 'scale(0.75)',
                padding: 0,
                marginLeft: '20px',
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginBottom: '10px', fontSize: '13px' }}>
        <p style={{ fontWeight: '10px', borderBottom: '1px solid rgb(61, 90, 128)' }}>Categories</p>
        {map(categories, (category) => (
          <div
            key={category.id}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ width: '80%', fontWeight: '300' }}>{category.name}</div>
            <Checkbox
              checked={includes(filters.category_ids, category.id)}
              color="primary"
              onChange={() => setCategories(category.id)}
              style={{
                transform: 'scale(0.75)',
                padding: 0,
                marginLeft: '20px',
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginBottom: '10px', fontSize: '13px' }}>
        <p style={{ fontWeight: '10px', borderBottom: '1px solid rgb(61, 90, 128)' }}>Status</p>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '80%', fontWeight: '300' }}>Is Settled</div>
          <Checkbox
            checked={filters.is_settled}
            onChange={setIsSettled}
            color="primary"
            style={{
              transform: 'scale(0.75)',
              padding: 0,
              marginLeft: '20px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FiltersComponent;
