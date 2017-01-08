HOME_FOLDER=./opencv

apt-get install build-essential cmake git pkg-config
apt-get install libjpeg8-dev libtiff4-dev libjasper-dev libpng12-dev
apt-get install libgtk2.0-dev
apt-get install libatlas-base-dev gfortran
apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev

pip install numpy
	
mkdir -p opencv

cd ${HOME_FOLDER}
git clone https://github.com/opencv/opencv.git
cd opencv
git checkout 3.0.0

cd ${HOME_FOLDER}/opencv
mkdir -p build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE \
	-D CMAKE_INSTALL_PREFIX=/usr/local \
	-D INSTALL_C_EXAMPLES=ON \
	-D INSTALL_PYTHON_EXAMPLES=ON \
	-D OPENCV_EXTRA_MODULES_PATH=${HOME_FOLDER}/opencv_contrib/modules \
	-D BUILD_EXAMPLES=ON ..

make -j4


make install
ldconfig

# ln -s  /usr/local/lib/python2.7/site-packages/cv2.so cv2.so