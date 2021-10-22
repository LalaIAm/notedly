import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';

import Home from './Home';
import MyNotes from './MyNotes';
import Favorites from './Favorites';

const Pages = () => {
  return (
    <Router>
      <Switch>
        <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/mynotes" component={MyNotes} />
        <Route path="/favorites" component={Favorites} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Pages;
