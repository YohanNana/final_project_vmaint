import pandas as pd
import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Load your data
df = pd.read_csv("synthetic_vehicle_maintenance_data.csv")

# Add noise
numeric_cols = [
    "mileage", "engine_temperature", "speed",
    "acceleration", "battery_voltage", "tire_pressure"
]
for col in numeric_cols:
    df[col] = df[col] + np.random.normal(0, df[col].std() * 0.05, size=len(df))  # 5% noise

# Drop weak/correlated features
X = df.drop(["maintenance_required", "acceleration", "road_condition", "brake_status"], axis=1)
y = df["maintenance_required"]

# Split once and reuse for both train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a smaller RandomForest
model = RandomForestClassifier(
    n_estimators=10,
    max_depth=2,
    min_samples_split=20,
    max_features="sqrt",
    random_state=42
)
model.fit(X_train, y_train)

# Save the model
with open("vehicle_maintenance_model.pkl", "wb") as f:
    pickle.dump(model, f)

# ALSO save the test set for evaluation
X_test.to_csv("X_test.csv", index=False)
y_test.to_csv("y_test.csv", index=False)

print("✅ Model retrained and test set saved.")
