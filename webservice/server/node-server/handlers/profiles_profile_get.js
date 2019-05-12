/**
* profiles_profile_get
*
* GET: /api/facial-recognition/profiles/profile/{id}
* 
*/
exports.handler = function profiles_profile_get(req, res, next) {
    console.log(`Getting profile for ${req.params.id}.`);
    db.getProfile (req.params.id, results => {
        console.log(`Results: ${JSON.stringify(results)}`);
        switch (results.status) {
            case db.SUCCESS:
                res.send(200, results);
                break;
            case db.NOT_FOUND:
                res.send(404, results);
                break;
            default:
                res.send(500, results);
        }
        next();
    });
};