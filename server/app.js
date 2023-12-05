import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import morgan from "morgan";
import handlers from "./handlers.js";

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
app.post('/login', handlers.login)
app.get('/logout', handlers.logout)

// User Routes
app.post('/registerUser', handlers.registerNewUser)
app.get('/getUser/:userId', handlers.getUserProfileInfo)


ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);