import * as passportLocal from 'passport-local';
import database from '../../../services/user-database';

let LocalStrategy = passportLocal.Strategy;

let localStrategy = new LocalStrategy(
    function (username, password, done) {
        let user = database[username];
        if (user === password) {
            return done(null, { username: username });
        }

        return done(null, false);
    }
);

export default localStrategy;