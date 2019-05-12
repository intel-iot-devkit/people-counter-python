import mqtt from "mqtt";
import { MQTT } from "./constants/constants";

class MqttClient {
  constructor() {

    // connect to mqtt server
    this.client = mqtt.connect( MQTT.MQTT_SERVER );

    // save subscribes here with topics as keys and handlers as values
    this.handlers = [];

    // listen for successful connection
    this.client.on( "connect", () => {
      // subscribe to every possible topic
      this.client.subscribe( MQTT.TOPICS.PERSON );
      this.client.subscribe( MQTT.TOPICS.DURATION );
      this.publish( "presence", "hello from react" );

      console.log( "connected to " + MQTT.MQTT_SERVER );
    } );

    // listen for mqtt messages
    this.client.on( "message", ( topic, message ) => {
      /*console.log( topic, message );*/
      let m = JSON.parse( message.toString() );
      // call all registered handlers
      this.handlers.forEach( ( h ) => {
        h.func( topic, m );
      } );
    } );
  }

  addHandler( id, handler ) {
    this.handlers.push( { id, func: handler } );
  }

  removeHandler( id ) {
    this.handlers = this.handlers.filter( ( h ) => {
      return h.id === id ? false : true;
    } );
  }

  publish( topic, payload ) {
    const p = payload || {};
    this.client.publish( topic, JSON.stringify( p ) );
  }
}

export default ( new MqttClient );
