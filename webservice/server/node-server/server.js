const swaggerRoutes = require('swagger-routes');
const restify = require('restify');
const config = require('./config');

const server = restify.createServer(config.restify.options);

/*  We create a global db variable because it needs to be referenced by the handlers.
    This is not ideal but, I couldn't figure out how to inject it and use the swagger-routes
    to automatically generate handlers.
 */
db = require('./db/sqlite.js');
db.open(config);

server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.queryParser({ mapParams: true }));


const corsMiddleware = require('restify-cors-middleware')
 
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional 
  origins: ['*'],
  allowHeaders: ['Access-Control-Allow-Origin'],
  exposeHeaders: ['API-Token-Expiry']
})
 
server.pre(cors.preflight)
server.use(cors.actual)


/*  swagger-routes package automatically generates our handlers based on the swagger.json. */
swaggerRoutes(server, {
    api: config.api,
    handlers:  {
        path: './handlers',
        template: './handlers/template.mustache'
    }
});

server.listen(config.restify.port);

/*  This is another of those global variables....*/
mqtt = require('./mqtt');
mqtt.configure(config);
mqtt.start();