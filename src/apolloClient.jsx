import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql-server-1-ibhr.onrender.com/graphql', // Backend ka Render URL
  cache: new InMemoryCache(),
});

export default client;
