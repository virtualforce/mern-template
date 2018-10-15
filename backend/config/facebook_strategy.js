const FacebookStrategy = require("passport-facebook").Strategy;
const appSecret = require("./keys").facebook_secret;
const appId = require("./keys").facebook_id;

const OmniauthController = require("../controllers/omniauth_controller");

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: appId,
        clientSecret: appSecret,
        callbackURL: "/api/auth/facebook/callback"
      },
      OmniauthController.createUserFromOAuth
    )
  );
};
