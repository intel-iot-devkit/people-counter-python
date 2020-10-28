
# People Counter


  | Details            |              |
|-----------------------|---------------|
| Target OS:            |  Ubuntu\* 18.04 LTS   |
| Programming Language: |  Python* 3.6 |
| Time to Complete:    |  45 min     |

![people-counter-python](./docs/images/people-counter-image.png)

## What it Does

The people counter application is one of a series of IoT reference implementations aimed at instructing users on how to develop a working solution for a particular problem. It demonstrates how to create a smart video IoT solution using Intel� hardware and software tools. This solution detects people in a designated area, providing the number of people in the frame, average duration of people in frame, and total count.

## Requirements

### Hardware

*  6th to 8th generation Intel� Core� processor with Iris� Pro graphics or Intel� HD Graphics.

### Software

*   [Ubuntu 18.04 LTS](http://releases.ubuntu.com/18.04/)

    **Note:** We recommend using a 4.14+ Linux kernel with this software. Run the following command to determine your kernel version:

     ```
     uname -a
     ```
*   Intel� Distribution of OpenVINO� toolkit 2020 R3 Release
*   OpenCL� Runtime Package
*   Node v6.17.1
*   Npm v3.10.10
*   MQTT Mosca\* server


### Which model to use

This application uses the [person-detection-retail-0013](https://docs.openvinotoolkit.org/2020.3/_models_intel_person_detection_retail_0013_description_person_detection_retail_0013.html) Intel® model, that can be accessed using the **model downloader**. The **model downloader** downloads the __.xml__ and __.bin__ files that will be used by the application.

### Install the dependencies

To install the dependencies of the RI and to download the **person-detection-retail-0013** Intel® model, run the following command:
```
cd <path_to_the_people-counter-python_directory>
./setup.sh
```

Make sure the npm and node versions are exact, using the commands given below:
```
node -v
```
The version should be **v6.17.1**

```
npm -v
```
The version should be **v3.10.10**

**Note**: If the Node and Npm versions are different, run the following commands:
```
sudo npm install -g n
sudo n 6.17.1
```
Note: After running the above commands, please open a new terminal to proceed further. Also, verify the node and npm versions from the new terminal.

## How it Works

The counter uses the Inference Engine included in the Intel� Distribution of OpenVINO� toolkit and the Intel� Deep Learning Deployment Toolkit. A pre-trained, SSD neural network detects people within a designated area by displaying a bounding box over them. It counts the number of people in the current frame, the duration that a person is in the frame (time elapsed between entering and exiting a frame) and the total count of people. It then sends the data to a local web server using the Paho MQTT Python package.

The DNN model used in this application is an Intel� optimized model that is part of the Intel� Distribution of OpenVINO� toolkit. You can find it here:

```/opt/intel/openvino/deployment_tools/open_model_zoo/tools/downloader/intel/person-detection-retail-0013/```

![architectural diagram](./docs/images/arch_diagram.png)

## Setup

### Get the code

Steps to clone the reference implementation:

```
sudo apt-get update && sudo apt-get install git
git clone https://github.com/intel-iot-devkit/people-counter-python.git 
```

### Install Intel� Distribution of OpenVINO� toolkit

Refer to [https://software.intel.com/en-us/articles/OpenVINO-Install-Linux](https://software.intel.com/en-us/articles/OpenVINO-Install-Linux) for more information about how to install and setup the Intel� Distribution of OpenVINO� toolkit.

You will need the OpenCL� Runtime Package if you plan to run inference on the GPU. It is not mandatory for CPU inference.

## Other Dependecies Installation
#### Install npm

Go to people-counter-python directory
```
cd <path_to_people-counter-python_directory>
```
* For mosca server:
   ```
   cd webservice/server
   npm install
   npm i jsonschema@1.2.6
   ```

* For Web server:
  ```
  cd ../ui
  npm install
  ```
### The Config File

The resources/config.json contains the path to the videos that will be used by the application.
The config.json file is of the form name/value pair, ```video: <path/to/video>```<br>

Example of the config.json file:<br>
```
{

    "inputs": [
	    {
            "video": "videos/video1.mp4"
        }
    ]
}
```

### Which Input video to use

The application works with any input video. Find sample videos for object detection [here](https://github.com/intel-iot-devkit/sample-videos/).

For first-use, we recommend using the [one-by-one-person-detection](https://github.com/intel-iot-devkit/sample-videos/blob/master/one-by-one-person-detection.mp4) video.The video is automatically downloaded to the `resources/` folder.
For example: <br>
The config.json would be:

```
{

    "inputs": [
	    {
            "video": "sample-videos/one-by-one-person-detection.mp4"
        }
    ]
}
```
To use any other video, specify the path in config.json file.

### Using the Camera instead of video

Replace the path/to/video in the _resources/config.json_  file with the camera ID, where the ID is taken from the video device (the number X in /dev/videoX).   

On Ubuntu, list all available video devices with the following command:

```
ls /dev/video*
```

For example, if the output of above command is /dev/video0, then config.json would be::

```
{

    "inputs": [
	    {
            "video": "0"
        }
    ]
}
```

## Run the application

There are three components need to be running in separate terminals for this application to work:

-   MQTT Mosca server
-   Node.js* Web server
-   FFmpeg server

Go to people-counter-python directory:
```
cd <path_to_people-counter-python_directory>
```
### Step 1 - Start the Mosca server

Ensure that no process is running at port address 3000 / 8000, using the following command:
```
sudo lsof -i:3000
```

Navigate to the `node-server` path and run the server using following commands:
```
cd webservice/server/node-server
node ./server.js
```

If successful, this message will appear in the terminal:
```
connected to ./db/data.db
Mosca server started.
```

### Step 2 - Start the GUI

Open new terminal and run below commands.
```
cd ../../ui
npm run dev
```

You should see the following message in the terminal.
```
webpack: Compiled successfully
```

### Step 3 - FFmpeg Server

Open new terminal and run the below commands.
```
cd ../..
sudo ffserver -f ./ffmpeg/server.conf
```

### Step 4 - Run the application

Open a new terminal to run the application.

#### Setup the environment

You must configure the environment to use the Intel� Distribution of OpenVINO� toolkit one time per session by running the following command:
```
source /opt/intel/openvino/bin/setupvars.sh
```
**Note**: This command needs to be executed only once in the terminal where the application will be executed. If the terminal is closed, the command needs to be executed again.

#### Run the application

Change the current directory to the git-cloned application code location on your system:
```
cd <path_to_the_people-counter-python_directory>/application
```

To see a list of the various options:
```
python3 people_counter.py --help
```

#### Running on the CPU

A user can specify a target device to run on by using the device command-line argument ```-d``` followed by one of the values ```CPU```, ```GPU```,```MYRIAD``` or ```HDDL```.

Though by default application runs on CPU, this can also be explicitly specified by ```-d CPU``` command-line argument:

```
python3 people_counter.py -m /opt/intel/openvino/deployment_tools/open_model_zoo/tools/downloader/intel/person-detection-retail-0013/FP32/person-detection-retail-0013.xml -d CPU -pt 0.6 | ffmpeg -v warning -f rawvideo -pixel_format bgr24 -video_size 768x432 -framerate 24 -i - http://localhost:8090/fac.ffm
```
To see the output on a web based interface, open the link [http://localhost:8080](http://localhost:8080/) in a browser.


#### Running on the GPU

* To run on the integrated Intel� GPU with floating point precision 32 (FP32), use the ```-d GPU``` command-line argument:

  ```
  python3 people_counter.py -m /opt/intel/openvino/deployment_tools/open_model_zoo/tools/downloader/intel/person-detection-retail-0013/FP32/person-detection-retail-0013.xml -d GPU -pt 0.6 | ffmpeg -v warning -f rawvideo -pixel_format bgr24 -video_size 768x432 -framerate 24 -i - http://localhost:8090/fac.ffm
  ```
  To see the output on a web based interface, open the link [http://localhost:8080](http://localhost:8080/) in a browser.<br><br>

   **FP32:** FP32 is single-precision floating-point arithmetic uses 32 bits to represent numbers. 8 bits for the magnitude and 23 bits for the precision. For more information, [click here](https://en.wikipedia.org/wiki/Single-precision_floating-point_format)<br><br>

* To run on the integrated Intel� GPU with floating point precision 16 (FP16):

  ```
  python3 people_counter.py -m /opt/intel/openvino/deployment_tools/open_model_zoo/tools/downloader/intel/person-detection-retail-0013/FP16/person-detection-retail-0013.xml -d GPU -pt 0.6 | ffmpeg -v warning -f rawvideo -pixel_format bgr24 -video_size 768x432 -framerate 24 -i - http://localhost:8090/fac.ffm
  ```
  To see the output on a web based interface, open the link [http://localhost:8080](http://localhost:8080/) in a browser.
  **FP16**: FP16 is half-precision floating-point arithmetic uses 16 bits. 5 bits for the magnitude and 10 bits for the precision. For more information, [click here](https://en.wikipedia.org/wiki/Half-precision_floating-point_format)


#### Running on the Intel� Neural Compute Stick
To run on the Intel� Neural Compute Stick, use the ```-d MYRIAD``` command-line argument:
```
python3 people_counter.py -d MYRIAD -m /opt/intel/openvino/deployment_tools/open_model_zoo/tools/downloader/intel/person-detection-retail-0013/FP16/person-detection-retail-0013.xml -pt 0.6 | ffmpeg -v warning -f rawvideo -pixel_format bgr24 -video_size 768x432 -framerate 24 -i - http://localhost:8090/fac.ffm
```
To see the output on a web based interface, open the link [http://localhost:8080](http://localhost:8080/) in a browser.<br>
**Note:** The Intel� Neural Compute Stick can only run FP16 models. The model that is passed to the application, through the `-m <path_to_model>` command-line argument, must be of data type FP16.

<!--
#### Running on the FPGA

Before running the application on the FPGA, program the AOCX (bitstream) file.
Use the setup_env.sh script from [fpga_support_files.tgz](http://registrationcenter-download.intel.com/akdlm/irc_nas/12954/fpga_support_files.tgz) to set the environment variables.

```
source /home/<user>/Downloads/fpga_support_files/setup_env.sh
```
The bitstreams for HDDL-F can be found under the `/opt/intel/openvino/bitstreams/a10_vision_design_bitstreams` folder.
To program the bitstreams use the below command.

```
aocl program acl0 /opt/intel/openvino/bitstreams/a10_vision_design_bitstreams/2019R1_PL1_FP11_RMNet.aocx
```
For more information on programming the bitstreams, please refer to https://software.intel.com/en-us/articles/OpenVINO-Install-Linux-FPGA#inpage-nav-11

To run the application on the FPGA with floating point precision 16 (FP16), use the `-d HETERO:FPGA,CPU` command-line argument:
```
python3.5 main.py -d HETERO:FPGA,CPU -i resources/Pedestrain_Detect_2_1_1.mp4 -l /opt/intel/openvino/deployment_tools/inference_engine/lib/intel64/libcpu_extension_sse4.so -m /opt/intel/openvino/deployment_tools/tools/model_downloader/Retail/object_detection/pedestrian/rmnet_ssd/0013/dldt/person-detection-retail-0013-fp16.xml -pt 0.6 | ffmpeg -v warning -f rawvideo -pixel_format bgr24 -video_size 768x432 -framerate 24 -i - http://localhost:8090/fac.ffm
```
#### Using Camera stream instead of video file

To get the input video from the camera, use ```-i CAM``` command-line argument. Specify the resolution of the camera using
```-video_size``` command line argument.

For example:
```
python3.5 main.py -i CAM -m /opt/intel/openvino/deployment_tools/tools/model_downloader/Retail/object_detection/pedestrian/rmnet_ssd/0013/dldt/person-detection-retail-0013.xml -l /opt/intel/openvino/deployment_tools/inference_engine/lib/intel64/libcpu_extension_sse4.so -d CPU -pt 0.6 | ffmpeg -v warning -f rawvideo -pixel_format bgr24 -video_size 768x432 -framerate 24 -i - http://localhost:8090/fac.ffm
```
To see the output on a web based interface, open the link [http://localhost:8080](http://localhost:8080/) in a browser.

**Note:**
User has to give ```-video_size``` command line argument according to the input as it is used to specify the resolution of the video or image file.
-->
