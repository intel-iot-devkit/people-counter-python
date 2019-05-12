/**
* profiles_profile_put
*
* PUT: /api/facial-recognition/profiles/profile
* 
*/
exports.handler = function profiles_profile_put(req, res, next) {
    console.log(`Updating profile: ${JSON.stringify(req.params.profile)}.`);
    db.updateProfile (req.params.profile, results => {
        console.log(`Results: ${JSON.stringify(results)}`);
        if (results.status === db.SUCCESS) {
            res.send(200, results);
        } else {
            res.send(500, results);
        }
        next();
    });
};