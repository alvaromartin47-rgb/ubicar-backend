export default async function catchErrors(req, res, next) {
    try {
        next();
    } catch (err) {
        res.status(500).end();
    }
}