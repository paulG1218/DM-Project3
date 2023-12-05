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
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile/:userId"
        element={<Profile />}
        loader={async ({ params }) => {
          const res = await axios.get(`/api/getUser/${params.userId}`);
          return { user: res.data };
        }}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
