const express = require("express");
const passport = require("passport");

const router = express.Router();

// Login
router.get("/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] }),
  (req ,res)=>{
    res.send(`<button><a href='/auth/google/login'>Sign in with google</a></button>`)
  }
);
router.get("/auth/google/login",
    passport.authenticate("google",{scope:["profile","email"]})
)
// Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: true }),
  (req, res) => {
    console.log(req.user.emails[0].value)
    res.json({
      message: "Google login success",
      user: req.user
    });
  }
);


// Protected Route
router.get("/profile", (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorized");
  res.json(req.user);
});

module.exports = router;
