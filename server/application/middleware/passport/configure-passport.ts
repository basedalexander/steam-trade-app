import * as passport from 'passport';

import { User, IUserModel } from '../../models/user';

import localStrategy from './strategies/local-strategy';
import steamStrategy from './strategies/steam-strategy';

function configurePassport(): void {
    passport.use(localStrategy);
    passport.use(steamStrategy);

    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });
    passport.deserializeUser(function (user, cb) {
        cb(null, user);
    });
}
export default configurePassport;