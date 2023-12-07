import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import RegisterNewUser from "./pages/RegisterNewUser";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import Root from "./Root.jsx";
import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>

      //every other route goes here
      <Route 
      index 
      element={<Home />} 
      loader={async () => {
        const lists = await axios.get('/api/getLists')
        const tasks = await axios.get(`/api/getTasks`)
        return({lists: lists.data, tasks: tasks.data})
      }}
      />

      <Route path="/login" element={<Login />} />

      <Route
        path="/profile"
        element={<Profile />}
        loader={async () => {
          const res = await axios.get(`/api/getUser`);
          return { data: res.data, user: res.data.user };
        }}
      />

      <Route 
        path='/registerNewUser'
        element={<RegisterNewUser />}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
