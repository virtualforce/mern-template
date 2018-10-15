const bcrypt = require("bcryptjs");

const CommonController = require("./common_controller");

exports.createUserFromOAuth = (accessToken, refreshToken, profile, done) => {
  let email = "";
  switch (profile.provider) {
    case "google":
      email = profile.emails[0].value;
      break;
    default:
      email = profile.email;
  }

  let password =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          uuid: profile.id,
          provider: profile.provider,
          firstName: profile.displayName.split(" ")[0],
          lastName: profile.displayName.split(" ").reverse()[0],
          email: email,
          password: ""
        });

        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              done(null, user);
            })
            .catch(err => done(err, false));
        });
      }
    })
    .catch(err => done(err, false));
};

exports.authenticateUserFromOAuth = (req, res) => {
  CommonController.generateBearer(
    req.user,
    res,
    req,
    "Logged in successfully!",
    true
  );
};
