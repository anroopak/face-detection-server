FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y  vim

# Installing Node JS
RUN apt-get install -y  nodejs npm


# Installing OpenCV
RUN apt-get install -y  build-essential cmake git pkg-config
RUN apt-get install -y  libjpeg8-dev libtiff5-dev libjasper-dev libpng12-dev
RUN apt-get install -y  libgtk2.0-dev
RUN apt-get install -y  libatlas-base-dev gfortran
RUN apt-get install -y  libavcodec-dev libavformat-dev libswscale-dev libv4l-dev

RUN apt-get install -y python python-pip
RUN pip install numpy

RUN mkdir -p /code/opencv
ADD ./opencv /code/opencv
WORKDIR /code/opencv/opencv

RUN mkdir -p /code/opencv/opencv/build
WORKDIR /code/opencv/opencv/build
RUN cmake -D CMAKE_BUILD_TYPE=RELEASE \
	-D CMAKE_INSTALL_PREFIX=/usr/local \
	-D INSTALL_C_EXAMPLES=ON \
	-D INSTALL_PYTHON_EXAMPLES=ON \
	-D OPENCV_EXTRA_MODULES_PATH=./opencv_contrib/modules \
	-D BUILD_EXAMPLES=ON ..

RUN make -j4

RUN make install
RUN ldconfig

RUN npm install -g n
RUN n stable

RUN npm install -g nodemon

ADD ./code /code/server
WORKDIR /code/server

RUN npm install

EXPOSE 3000