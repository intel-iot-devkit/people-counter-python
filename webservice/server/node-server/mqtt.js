var config;
var server;
const mosca = require('mosca');

module.exports = {
    configure: function (c) {
        config = c;
    },

    start: function () {
        server = new mosca.Server({
            port: config.mqtt.port,
            http: config.mqtt.http,
        });

        server.on('ready', setup);
        server.on('clientConnected', connected);
        server.on('clientDisconnected', disconnected);
        server.on('published', published);
        server.on('subscribed', subscribed);
        server.on('unsubscribed', unsubscribed);
    },

    publish: function (topic, message) {
        var payload = {
            topic: topic,
            payload: message,
            qos: 0,
            retain: false
        };

        server.publish(payload, function () {
            console.log('Published callback complete.');
        });
    }
};

function setup() {
    console.log('Mosca server started.');
}

function connected(client) {
    console.log(`Client ${client.id} connected`);
}

function subscribed(topic, client) {
    console.log(`Client ${client.id} subscribed to ${topic}.`);
}

function unsubscribed(topic, client) {
    console.log(`Client ${client.id} unsubscribed from ${topic}.`);
}

function disconnected(client) {
    console.log(`Client ${client.id}`);
}

function published(packet, client) {
    console.log(`Published to ${packet.topic} <- ${packet.payload}`);
}
