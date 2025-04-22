require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const http = require("http");
const server = http.createServer(app);
const MongoStore = require("connect-mongo");
const router = require("./src/router/router");
const servidor = require("./src/server/servidor");

const sessionMiddleware = session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    collectionName: "sessions",
    ttl: 8 * 60 * 60,
  }),
});

app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(router);

servidor(server, sessionMiddleware);

server.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor online na porta ", PORT);
});
