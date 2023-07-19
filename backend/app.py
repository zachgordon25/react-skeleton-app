from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
import cv2
import numpy as np
import os
import tempfile
import base64
from skeleton.extractKimiaEDF import generate_skeleton


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


def get_pixel_coordinates(image, scale_x, scale_y):
    coords = []
    for y in range(image.shape[0]):
        for x in range(image.shape[1]):
            if np.any(image[y, x] != [255, 255, 255]):
                coords.append((x * scale_x, y * scale_y))
    return coords


def process_image(file_path):
    target_height = 200
    image = cv2.imread(file_path)
    aspect_ratio = image.shape[1] / image.shape[0]
    target_width = int(target_height * aspect_ratio)

    scale_x = target_width / image.shape[1]
    scale_y = target_height / image.shape[0]

    resized_image = cv2.resize(image, (target_width, target_height))
    gray_image = cv2.cvtColor(resized_image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray_image, threshold1=30, threshold2=100)

    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    white_image = np.ones_like(resized_image) * 255

    # Draw blue contours on the white image
    cv2.drawContours(white_image, contours, -1, (255, 0, 0), 1)

    coordinates = get_pixel_coordinates(white_image, scale_x, scale_y)
    height = edges.shape[0]
    contour_strings = [
        "{:.7e} {:.7e}".format(float(point[0][0]), float(height - point[0][1]))
        for contour in contours
        for point in contour
    ]

    output = {"coordinates": coordinates, "contour_strings": contour_strings}
    return output


@app.route("/")
def home():
    return render_template("upload.html")


@app.route("/upload", methods=["POST"])
def upload_image():
    file = request.files["file"]

    if file and file.filename:
        file_path = os.path.join(tempfile.gettempdir(), file.filename)
        file.save(file_path)

        output = process_image(file_path)

        filename = os.path.splitext(file.filename)[0]
        skeleton_img_base64 = generate_skeleton(output["contour_strings"], filename)

        # Return the filename and image data as JSON
        return jsonify({"filename": filename, "imageData": skeleton_img_base64})

    return jsonify({"error": "No file was uploaded. Please upload a file."}), 400


@app.route("/uploads/<filename>")
def send_uploaded_file(filename):
    return send_from_directory("skeleton", filename)


if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
