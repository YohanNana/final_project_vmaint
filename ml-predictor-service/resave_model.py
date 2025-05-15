# File: ml-predictor-service/resave_model.py

import pickle
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# 1) Load your data
df = pd.read_csv("synthetic_vehicle_maintenance_data.csv")
print("Columns in CSV:", df.columns.tolist())

# 2) One-hot encode any categorical columns (road_condition)
df_encoded = pd.get_dummies(df, columns=["road_condition"], drop_first=True)

# 3) Split features / target
X = df_encoded.drop("maintenance_required", axis=1)
y = df_encoded["maintenance_required"]

# 4) Train a fresh RandomForest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)
print("Model retrained on", X.shape[0], "samples and", X.shape[1], "features.")

# 5) Dump the new pickle
out_path = "vehicle_maintenance_model_resave.pkl"
with open(out_path, "wb") as f:
    pickle.dump(model, f)
print(f"✅ Resaved model to {out_path}")
