import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import './App.css'
import Users from './components/Users'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from './components/Landing'
import { setContext } from 'apollo-link-context'
import Signup from './pages/Signup'
import Login from './pages/Login'
import IsAuthenticated from './components/IsAuthenticated'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})

const authLink = setContext(async(req: any, {headers}) => {
  const token = localStorage.getItem('token')

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})

const link = authLink.concat(httpLink as any)
const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/users" element = {
            <IsAuthenticated>
              <Users />
            </IsAuthenticated>
          }></Route>
          <Route path="/landing" element = {<Landing />}></Route>
          <Route path="/signup" element = {<Signup />}></Route>
          <Route path="/login" element = {<Login />}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
