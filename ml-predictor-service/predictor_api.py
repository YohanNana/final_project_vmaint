# predictor_api.py
import pickle
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your retrained model
with open("vehicle_maintenance_model_resave.pkl", "rb") as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input provided"}), 400

    try:
        # 1) Build a single-row DataFrame
        df = pd.DataFrame([data])

        # 2) One-hot encode 'road_condition' only if it's present
        if 'road_condition' in df.columns:
            df = pd.get_dummies(df, columns=['road_condition'], drop_first=True)

        # 3) Ensure all model features are present
        #    model.feature_names_in_ contains exactly what the model expects
        expected = list(model.feature_names_in_)
        for col in expected:
            if col not in df.columns:
                df[col] = 0

        # 4) Reorder to model’s feature order
        df = df[expected]

        # 5) Predict
        pred = model.predict(df)[0]
        return jsonify({"maintenance_required": int(pred)})

    except Exception as e:
        # return 500 + error message for debugging
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
