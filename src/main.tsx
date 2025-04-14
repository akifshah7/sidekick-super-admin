import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client'
import client from './api/client.ts'

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
