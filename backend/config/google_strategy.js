const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const clientId = require("./keys").google_cliend_id;
const clientSecret = require("./keys").google_client_secret;

const OmniauthController = require("../controllers/omniauth_controller");

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: "/api/auth/google/callback"
      },
      OmniauthController.createUserFromOAuth
    )
  );
};
