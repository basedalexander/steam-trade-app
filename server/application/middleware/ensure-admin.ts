import { User } from '../models/user';

export function ensureAdmin(req, res, next): void {
    if (!req.isAuthenticated()) {
        return res.status(401).send();
    }

    User.findOne({ steamID: req.user.id, admin: true }, (err, result) => {
        if (err) {
            return next(err);
        }

        if (!result) {
            return res.status(401).send();
        }
        
        next();
    });
}
