import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from pathlib import Path

# Create flask app
flask_app = Flask(__name__)
model_path = Path(__file__).resolve().parent / "model.pkl"
with model_path.open("rb") as model_file:
    model_data = pickle.load(model_file)
model = model_data["model"]
scaler = model_data["scaler"]

@flask_app.route("/")
def Home():
    return render_template("index.html")

@flask_app.route("/predict", methods = ["POST"])
def predict():
    float_features = [float(x) for x in request.form.values()]
    features = np.array([float_features])
    scaled_features = scaler.transform(features)
    prediction = model.predict(scaled_features)
    return render_template("index.html", prediction_text = "The flower species is {}".format(prediction))

if __name__ == "__main__":
    flask_app.run(debug=True)