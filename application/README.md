
# 1. Download the video (or set video/rtsp in resources/config.json)
cd resources
wget -O one-by-one-person-detection.mp4 https://github.com/intel-iot-devkit/sample-videos/raw/master/one-by-one-person-detection.mp4

# 2. Install Docker and Compose
# https://docs.docker.com/compose/install/

# 3. Change MQTT_SERVER in the docker-compose.yml

# 4. Run the container
docker login docker.pkg.github.com --username jnet2-auto-deployment -p dbe0570d04a464f342dbc1855b83e42d4d8d182f

docker-compose up -d
