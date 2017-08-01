export default function ensureAuthenticated(req, res, next): void {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        if (req.url.match(/^\/api\//)) {
            res.status(401).json({ status: 401 })
        }
        else {
            res.redirect('/');
        }
    }
}