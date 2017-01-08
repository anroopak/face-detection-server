#! /usr/bin/python
import sys
import cv2
import os
face_cascade = cv2.CascadeClassifier('./face-detector/haarcascade_frontalface_default.xml')


def draw_rectangles(input_path, output_path):
    print "Loading image..."
    img = cv2.imread(input_path)
    print "Loaded image."

    print "Converting into GrayScale..."
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    print "Converted into GrayScale."

    print "Detecting faces..."
    faces = face_cascade.detectMultiScale(
        gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    print "Detected %d faces." % len(faces)

    print "Drawing rectangles..."
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0,255,255), 3)
        cv2.rectangle(img, (x-3, y-3), (x + w + 3, y + h + 3), (0,0, 255), 3)
    print "Drawn Rectangles."

    cv2.imwrite(output_path, img)


if __name__ == '__main__':

    input_path = sys.argv[1]
    output_path = sys.argv[2]

    print sys.argv

    draw_rectangles(input_path, output_path)
