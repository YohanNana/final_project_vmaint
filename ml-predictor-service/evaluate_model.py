import pandas as pd
import pickle
from sklearn.metrics import accuracy_score, classification_report

# Load the same test set
X_test = pd.read_csv("X_test.csv")
y_test = pd.read_csv("y_test.csv").squeeze()  # To get Series not DataFrame

# Load your saved model
with open("vehicle_maintenance_model.pkl", "rb") as f:
    model = pickle.load(f)

# Predict and evaluate
y_pred = model.predict(X_test)

print("✅ Accuracy:", accuracy_score(y_test, y_pred))
print("📊 Classification Report:\n", classification_report(y_test, y_pred))
