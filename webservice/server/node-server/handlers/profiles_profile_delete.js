/**
* profiles_profile_delete
*
* DELETE: /api/facial-recognition/profiles/profile/{id}
* 
*/
exports.handler = function profiles_profile_delete(req, res, next) {
    console.log(`Deleting profile for ${req.params.id}.`);
    db.deleteProfile (req.params.id, results => {
        console.log(`Results: ${JSON.stringify(results)}`);
        if (results.status === db.SUCCESS) {
            res.send(200, results);
            next();
        } else {
            res.send(500, results);
            next();
        }
    });
};