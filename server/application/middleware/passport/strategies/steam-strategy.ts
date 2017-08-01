import steam = require('passport-steam');
import { serverConfiguration } from '../../../../startup/server-configuration';
let config = serverConfiguration.get();

let SteamStrategy = steam.Strategy;

let steamStrategy = new SteamStrategy({
        returnURL: `http://${config.domain}:${config.port}/auth/steam/return`,
        realm: `http://${config.domain}:${config.port}/`,
        apiKey: serverConfiguration.get().apiKey
    },
    function(identifier, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Steam profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Steam account with a user record in your database,
            // and return that user instead.
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
);

export default steamStrategy;

