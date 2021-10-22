import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  gql
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Pages from './pages';
import GlobalStyle from './components/GlobalStyle';

const cache = new InMemoryCache();
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    },
  };
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

const data = {
    isLoggedIn: !!localStorage.getItem('token')
}

cache.writeQuery({
    query: IS_LOGGED_IN,
    data: data
})

client.onResetStore(() => cache.writeQuery({data}))

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
