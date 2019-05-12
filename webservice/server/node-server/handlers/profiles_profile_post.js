/**
* profiles_profile_post
*
* POST: /api/facial-recognition/profiles/profile
* 
*/
exports.handler = function profiles_profile_post(req, res, next) {
    console.log(`Inserting profile: ${JSON.stringify(req.params.profile)}.`);
    db.insertProfile (req.params.profile, results => {
        console.log(`Results: ${JSON.stringify(results)}`);
        if (results.status === db.SUCCESS) {
            res.send(200, results);
        } else {
            res.send(500, results);
        }
        next();
    });
}