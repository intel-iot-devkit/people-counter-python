export const SETTINGS = {
  NODE_SERVER: "http://localhost:8000",
  CAMERA_FEED_SERVER: "http://localhost:8090",
  CAMERA_FEED_WIDTH: 852,
  MAX_POINTS: 10,
  SLICE_LENGTH: -10,
};

export const LABELS = {
  START_TEXT: "Click me! ",
  END_TEXT: "The count is now: ",
};

export const HTTP = {
  GET_IMAGE: `${SETTINGS.NODE_SERVER}/api/facial-recognition/file/`,//sample
  CAMERA_FEED: `${SETTINGS.CAMERA_FEED_SERVER}/facstream.mjpeg`, // POST
};

export const MQTT = {
  MQTT_SERVER: "ws://localhost:3000",
  TOPICS: {
    PERSON: "person", // how many people did we see
    DURATION: "person/duration", // how long were they on frame
  },
};
