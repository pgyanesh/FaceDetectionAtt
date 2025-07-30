from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import cv2
import numpy as np
import os
import pickle
import csv
import pandas as pd
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# File paths
CSV_FILE = 'attendance.csv'
ENCODING_FILE = 'encodings.pickle'
REGISTER_DIR = 'register_data'

# Ensure required folders and files exist
os.makedirs(REGISTER_DIR, exist_ok=True)

# Ensure CSV file exists with correct headers
if not os.path.isfile(CSV_FILE):
    df = pd.DataFrame(columns=["Date", "Name", "Time"])
    df.to_csv(CSV_FILE, index=False)
    print(f"[INFO] Created new '{CSV_FILE}' with headers.")
else:
    print(f"[INFO] '{CSV_FILE}' already exists.")

# Ensure encodings file exists
if not os.path.isfile(ENCODING_FILE):
    with open(ENCODING_FILE, 'wb') as f:
        pickle.dump({'encodings': [], 'names': []}, f)
    print(f"[INFO] Created new '{ENCODING_FILE}'.")
else:
    print(f"[INFO] '{ENCODING_FILE}' already exists.")

# === Register New Face ===
@app.route('/register', methods=['POST'])
def register():
    try:
        name = request.form.get('name')
        image = request.files.get('image')

        if not name or not image:
            return jsonify({"error": "Missing name or image"}), 400

        img_array = face_recognition.load_image_file(image)
        encodings = face_recognition.face_encodings(img_array)

        if not encodings:
            return jsonify({"error": "No face detected"}), 400

        new_encoding = encodings[0]

        with open(ENCODING_FILE, 'rb') as f:
            data = pickle.load(f)

        data['encodings'].append(new_encoding)
        data['names'].append(name)

        with open(ENCODING_FILE, 'wb') as f:
            pickle.dump(data, f)

        return jsonify({"status": "success", "message": "User registered successfully"})

    except Exception as e:
        print("Register Error:", str(e))
        return jsonify({"error": str(e)}), 500

# === Mark Attendance ===
@app.route('/mark', methods=['POST'])
def mark_attendance():
    try:
        if not os.path.exists(ENCODING_FILE):
            return jsonify({"error": "No encodings found"}), 500

        with open(ENCODING_FILE, 'rb') as f:
            data = pickle.load(f)

        known_encodings = data['encodings']
        known_names = data['names']

        image = request.files.get('image')
        if not image:
            return jsonify({"error": "No image uploaded"}), 400

        img_array = face_recognition.load_image_file(image)
        unknown_encodings = face_recognition.face_encodings(img_array)

        if not unknown_encodings:
            return jsonify({"error": "No face found in image"}), 400

        match_name = None
        for face_encoding in unknown_encodings:
            results = face_recognition.compare_faces(known_encodings, face_encoding)
            distances = face_recognition.face_distance(known_encodings, face_encoding)

            if len(distances) == 0:
                continue

            best_match = np.argmin(distances)
            if results[best_match]:
                match_name = known_names[best_match]
                break

        if not match_name:
            return jsonify({"error": "Face not recognized"}), 400

        now = datetime.now()
        date_str = now.strftime("%Y-%m-%d")
        time_str = now.strftime("%H:%M:%S")

        df = pd.read_csv(CSV_FILE)

        # Optional: prevent duplicates per day
        # if not ((df['Name'] == match_name) & (df['Date'] == date_str)).any():
        df.loc[len(df.index)] = [date_str, match_name, time_str]
        df.to_csv(CSV_FILE, index=False)

        return jsonify({"status": "success", "name": match_name})

    except Exception as e:
        print("Mark Error:", str(e))
        return jsonify({"error": str(e)}), 500

# === Get Attendance Log ===
@app.route('/attendance', methods=['GET'])
def get_attendance():
    try:
        data = []
        with open(CSV_FILE, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                data.append({
                    "Name": row.get("Name", ""),
                    "Date": row.get("Date", ""),
                    "Time": row.get("Time", "")
                })
        return jsonify(data)
    except Exception as e:
        print("Get Attendance Error:", str(e))
        return jsonify({"error": str(e)}), 500

# === Run the App ===
if __name__ == '__main__':
    app.run(debug=True)
