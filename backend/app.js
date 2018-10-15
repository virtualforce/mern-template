const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const session = require("express-session");

const dbUrl = require("./config/keys").mongoDbUrl;
const userRoutes = require("./routes/api/users");
const oauthRoutes = require("./routes/api/oauth");

mongoose
  .connect(
    dbUrl,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(e => console.log(`Error connecting MongoDb ${e}`));

const app = express();

app.use(
  session({
    secret: "my_Sect",
    resave: true,
    saveUninitialized: true
  })
);

app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);
require("./config/facebook_strategy")(passport);
require("./config/google_strategy")(passport);

let server = http.createServer(app);
const io = socketio(server);
app.set("io", io);

app.use("/api/users", userRoutes);
app.use("/api/auth", oauthRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
}

module.exports = server;
