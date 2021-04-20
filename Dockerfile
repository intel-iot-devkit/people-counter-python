FROM openvino/ubuntu18_dev:2020.3

USER root

RUN apt update
RUN apt-get install -y python3-pip
#RUN apt-get install -y mosquitto mosquitto-clients
RUN pip3 install numpy paho-mqtt 
#RUN apt install -y libzmq3-dev libkrb5-dev
#RUN apt install -y ffmpeg



COPY . /

#Download the model
WORKDIR /opt/intel/openvino/deployment_tools/tools/model_downloader
RUN ./downloader.py --name person-detection-retail-0013

ENV LD_LIBRARY_PATH=/opt/intel/openvino/opencv/lib:/opt/intel/openvino/deployment_tools/ngraph/lib:/opt/intel/openvino/deployment_tools/inference_engine/external/hddl/lib:/opt/intel/openvino/deployment_tools/inference_engine/external/gna/lib:/opt/intelopenvino/deployment_tools/inference_engine/external/mkltiny_lnx/lib:/opt/intel/openvino/deployment_tools/inference_engine/external/tbb/lib:/opt/intel/openvino/deployment_tools/inference_engine/lib/intel64:
ENV INTEL_CVSDK_DIR=/opt/intel/openvino
ENV OpenCV_DIR=/opt/intel/openvino/opencv/cmake
ENV InferenceEngine_DIR=/opt/intel/openvino/deployment_tools/inference_engine/share
ENV ngraph_DIR=/opt/intel/openvino/deployment_tools/ngraph/cmake
ENV PYTHONPATH=/opt/intel/openvino/python/python3.6:/opt/intel/openvino/python/python3:/opt/intel/openvino/deployment_tools/open_model_zoo/tools/accuracy_checker:/opt/intel/openvino/deployment_tools/model_optimizer:
ENV INTEL_OPENVINO_DIR=/opt/intel/openvino
ENV PATH=/opt/intel/openvino/deployment_tools/model_optimizer:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ENV HDDL_INSTALL_DIR=/opt/intel/openvino/deployment_tools/inference_engine/external/hddl


WORKDIR /application

