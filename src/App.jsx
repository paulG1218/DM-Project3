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
import RegisterNewUser from "./pages/RegisterNewUser.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Groups from "./pages/Groups.jsx";
import Root from "./Root.jsx";
import axios from "axios";
import CatTesting from "./pages/catTesting.jsx";
import GroupPage from "./pages/GroupPage.jsx";
import AddTask from "./pages/addTask";
import Board from "../Games/ReactGames/Board";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      //every other route goes here
      <Route index element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/catTesting" element={<CatTesting/>} />

      <Route path="/AddTask" element = {<AddTask/>}/>

      <Route path="/GameBoard" element = {<Board/>}/>
        

      <Route
        path="/profile"
        element={<Profile />}
        loader={async () => {
          const res = await axios.get(`/api/getUser`);
          return { data: res.data, user: res.data.user };
        }}
      />

      <Route
        path="/groups"
        element={<Groups/>}
      />

      <Route path="/registerNewUser" element={<RegisterNewUser />} />

      <Route
        path="/groups/:groupId"
        element={<GroupPage/>}
        loader={async ({params}) => {
          const res = await axios.get(`/api/getGroup/${params.groupId}`);
          return { group: res.data.group, userId: res.data.userId};
        }}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
