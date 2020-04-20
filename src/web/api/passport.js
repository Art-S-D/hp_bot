const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Player } = require("mongo");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await Player.findOne({ name: username }).catch((e) => done(e));
    if (!user) return done(null, false, { message: "Incorrect username." });
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  const player = await Player.findById(id).catch((e) => {
    console.log(e);
    done(e);
  });
  done(null, player);
});
