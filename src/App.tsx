import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { RestLink } from 'apollo-link-rest';
// import { ApolloProvider, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { ApolloProvider, Query } from 'react-apollo'
import { gql, loader } from 'graphql.macro';
import resolvers from './resolvers';

const cache = new InMemoryCache();

// @ts-ignore
const client = new ApolloClient({
  cache,
  clientState: {
    typeDefs: loader('./schema.graphql'),
    resolvers,
  },
});

const TopStories = () => {
  return (
    <Query
      query={gql`
        query TopStories {
          topStories @client {
            stories {
              createdBy {
                id
                about
                karma
              }
            }
          }
        }
      `}
    >
      {({data}) => {
        console.log('data :', data);
        return (
          <div/>
        )
      }}
    </Query>
  )
}

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <TopStories />
    </ApolloProvider>
  );
}

export default App;
