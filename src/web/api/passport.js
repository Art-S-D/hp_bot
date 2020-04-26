const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Player } = require("mongo");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    if (username === "MJ" && password === "JdrAPoudlard") {
      return done(null, { isAdmin: true });
    }
    const user = await Player.findOne({ name: username }).catch((e) => done(e));
    if (!user) return done(null, false, { message: "Incorrect username." });
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, { isAdmin: false, player: user });
  })
);

passport.serializeUser(function (user, done) {
  done(null, { isAdmin: user.isAdmin, player: user.player && user.player._id });
});

passport.deserializeUser(async function (id, done) {
  const player = await Player.findById(id.player, "-password").catch((e) => {
    console.error(e);
    done(e);
  });
  done(null, { isAdmin: id.isAdmin, player: player });
});
