const express = require("express");
const session = require("express-session");
const passport = require("passport");

require('./auth/google') // Google strategy config
const authRoute = require("./routes/authRoute");

const app = express();

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));

// ✅ passport FIRST
app.use(passport.initialize());
app.use(passport.session());

// ✅ routes AFTER passport
app.use("/", authRoute);

app.get("/", (req, res) => {
  res.send("OAUTH2.0 running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
