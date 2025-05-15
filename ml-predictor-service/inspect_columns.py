# File: ml-predictor-service/inspect_columns.py
import pandas as pd

df = pd.read_csv("synthetic_vehicle_maintenance_data.csv")
print("Columns in CSV:", list(df.columns))
print("First few rows:\n", df.head())
