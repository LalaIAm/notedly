import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/Layout';

import Home from './Home';
import MyNotes from './MyNotes';
import Favorites from './Favorites';
import NotePage from './Note';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NewNote from './New';
import EditNote from './EditNote';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERror</p>;

  return (
    <Route
      {...rest}
      render={(props) =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Pages = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/mynotes" component={MyNotes} />
          <PrivateRoute path="/favorites" component={Favorites} />
          <Route path="/note/:id" component={NotePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path='/new' component={NewNote} />
          <PrivateRoute path='/edit/:id' component={EditNote} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Pages;
