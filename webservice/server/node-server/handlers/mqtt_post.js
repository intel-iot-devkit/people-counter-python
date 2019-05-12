/**
* mqtt_post
*
* POST: /api/facial-recognition/mqtt
* 
    * body:
    *   topic {string}
    *   message {string}
    *   
*/
exports.handler = function mqtt_post(req, res, next) {
    mqtt.publish(req.params.topic, req.params.message);
    res.send(200, 'Message published (I think).');
    next()
};