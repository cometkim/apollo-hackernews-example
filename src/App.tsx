import React from 'react';
import './App.css';

import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql, loader } from 'graphql.macro';

import resolvers from './resolvers';
import introspectionQueryResultData from 'generated/introspection-result';

import { useTopStoriesQuery } from './App.generated';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({
  fragmentMatcher,
});

// @ts-ignore
const client = new ApolloClient({
  cache,
  clientState: {
    typeDefs: loader('./schema.graphql'),
    resolvers,
  },
});

export const TopStories = gql`
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
`;

const TopStoriesComponent = () => {
  const { data } = useTopStoriesQuery();
  console.log('data :', data);
  return (
    <div/>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <TopStoriesComponent />
    </ApolloProvider>
  );
};

export default App;
