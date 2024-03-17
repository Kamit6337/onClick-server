import { environment } from "./environment.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";

// NOTE:GOOGLE OAUTH
passport.use(
  new GoogleStrategy(
    {
      clientID: environment.GOOGLE_CLIENT_ID,
      clientSecret: environment.GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// NOTE: FACEBOOK OAUTH
passport.use(
  new FacebookStrategy(
    {
      clientID: environment.FACEBOOK_APP_ID,
      clientSecret: environment.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// NOTE: SERIALISE AND DE-SERIALISE USER
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
