import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  // uri: 'http://localhost:2001/graphql',
  uri: 'https://graphql-server-1-ibhr.onrender.com/graphql',
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ApolloProvider client={client}>
       <App />
   </ApolloProvider>
  </StrictMode>,
)
