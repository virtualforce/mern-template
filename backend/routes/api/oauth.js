const express = require("express");
const router = express.Router();
const passport = require("passport");

const OmniauthController = require("../../controllers/omniauth_controller");

// @route   GET /api/auth/facebook
// @desc    Load Facebook Consent Screen
router.get("/facebook", passport.authenticate("facebook"));

// @route   GET /api/auth/facebook/callback
// @desc    Facebook will redirect to this URL
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: false
  }),
  OmniauthController.authenticateUserFromOAuth
);

// @route   GET /api/auth/google
// @desc    Load Google Consent Screen
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// @route   GET /api/auth/google/callback
// @desc    Google will redirect to this URL
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false
  }),
  OmniauthController.authenticateUserFromOAuth
);

module.exports = router;
