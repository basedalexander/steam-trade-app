export default function errorLogger(err, req, res , next) {
    console.error(err);
    next(err);
}