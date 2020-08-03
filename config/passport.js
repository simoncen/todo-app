// configuration which reads the JWT from the http Authorization header with the scheme 'bearer':

const JwtStrategy = require("passport-jwt").Strategy; // an object
const ExtractJwt = require("passport-jwt").ExtractJwt; // a json object which decodes jwt
const mongoose = require("mongoose");
const User = mongoose.model("User");
const key = require("../config/key");
const opts = {}; // options is an object literal containing options to control how the token is extracted from the request or verified.
// create keys from the opts json object:
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey; // secretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature. REQUIRED unless secretOrKeyProvider is provided.
module.exports = passport => { // passport is the input as in the es6 arrow function ; export default in the front end is defined in es6, module.exports is defined in the Node.js
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => { // jwt_payload is grabbed from the header --> fromAuthHeaderAsBearerToken(), an json object; the JwtStrategy has the opts to verify whether the token is sent from this server with the secretOrKey, and to get the decoded toekn from the header
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
