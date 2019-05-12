/**
* profiles_get
*
* GET: /api/facial-recognition/profiles
* 
*/
exports.handler = function profiles_get(req, res, next) {
    console.log(`Getting all profiles.`);
    db.getAllProfiles(function (results) {
        console.log(`Results: ${JSON.stringify(results)}`);

        if (results.status === db.SUCCESS) {
           res.send(200, results);
       } else {
           console.log('failure');
           res.send(500, results);
       }
       next();
    });
};