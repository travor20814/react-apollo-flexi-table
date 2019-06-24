// @flow
/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { hot } from 'react-hot-loader';

import FlexiTable from './table/FlexiTable.jsx';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <FlexiTable />
    </ApolloProvider>
  );
}

export default hot(module)(App);
