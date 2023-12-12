import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import morgan from "morgan";
import handlers from "./handlers.js"

const app = express();
const port = "8000";
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

// Authentication Routes
app.get('/api/sessionCheck', handlers.sessionCheck)
app.post('/api/login', handlers.login)
app.get('/api/logout', handlers.logout)

// User Routes
app.post('/api/registerUser', handlers.registerNewUser)
app.get('/api/getUser', handlers.getUserProfileInfo)
app.put('/api/editUser/:userId', handlers.editUserInfo)
app.delete('/api/deleteUser', handlers.deleteUser)
app.put('/api/addAdmin', handlers.addAdmin)
app.post('/api/addTask', handlers.addTask)

//list routes
app.put('/api/checkTask', handlers.checkTask)
app.post('/api/addList', handlers.addList)
app.post('/api/addGroupList/:groupId', handlers.addGroupList)
app.get('/api/getLists', handlers.getLists)

//Group routes
app.get('/api/getGroup/:groupId', handlers.getGroup)

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);