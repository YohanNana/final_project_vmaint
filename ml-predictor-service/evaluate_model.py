import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Load data
df = pd.read_csv("synthetic_vehicle_maintenance_data.csv")

# Split into features and target
X = df.drop("maintenance_required", axis=1)
y = df["maintenance_required"]

# One-hot encode categorical features
X = pd.get_dummies(X, columns=["road_condition"], drop_first=True)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Load your saved model
with open("vehicle_maintenance_model_resave.pkl", "rb") as f:
    model = pickle.load(f)

# Predict
y_pred = model.predict(X_test)

# Evaluate
print("✅ Accuracy:", accuracy_score(y_test, y_pred))
print("📊 Classification Report:\n", classification_report(y_test, y_pred))
