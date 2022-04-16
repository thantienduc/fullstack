import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, {Fragment} from 'react';
import './App.css';
import Users from './components/Users';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from './components/Landing';

const client  = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element = {<Users />}></Route>
          <Route path="/landing" element = {<Landing />}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
