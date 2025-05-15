# predictor_api.py
import pickle
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ Load the resaved model
with open("vehicle_maintenance_model_resave.pkl", "rb") as f:
    model = pickle.load(f)

# ✅ Define prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input provided"}), 400

    try:
        df = pd.DataFrame([data])

        # One-hot encode road_condition like training
        df_encoded = pd.get_dummies(df, columns=["road_condition"], drop_first=True)

        # Ensure all expected columns are present
        required_cols = model.feature_names_in_
        for col in required_cols:
            if col not in df_encoded.columns:
                df_encoded[col] = 0  # add missing dummy columns with 0

        df_encoded = df_encoded[required_cols]  # keep correct order

        prediction = model.predict(df_encoded)[0]
        return jsonify({"maintenance_required": int(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
