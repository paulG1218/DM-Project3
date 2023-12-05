import './App.css'
import { createBrowserRouter, createRoutesFromElements, BrowserRouter, Routes, Route, RouterProvider} from 'react-router-dom'
import Login from './pages/Login.jsx'
import RegisterNewUser from './pages/RegisterNewUser'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Groups from './pages/Groups'
import Root from './Root.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      //every other route goes here
      <Route
        index
        element={<Home />}
      />

      <Route 
        path='/login'
        element={<Login />}
      />

      <Route 
        path='/registerNewUser'
        element={<RegisterNewUser />}
      />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />;
}

export default App
