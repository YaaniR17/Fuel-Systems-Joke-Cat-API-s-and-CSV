import pandas as pd
import matplotlib.pyplot as plt
import mysql.connector

# Load data and calculate the average
fuel = pd.read_csv("UpdatedFuelPrice-1790866800131.csv", usecols=['forecourts.fuel_price.B7P'])
fuel.columns = ['B7P_Price']
fuel = fuel.dropna(subset=['B7P_Price'])

# Convert to standard float
national_avg = float(fuel['B7P_Price'].mean()) 
print(f"The average B7P (Premium Diesel) price is: {national_avg:.2f}")

# Connect to MariaDB
db = mysql.connector.connect(
  host="127.0.0.1",
  user="admin",
  password="password123",
  database="fuel_db"
)
cursor = db.cursor()

# Create the table if it doesn't exist
cursor.execute("""
    CREATE TABLE IF NOT EXISTS fuel_averages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fuel_type VARCHAR(10),
        average_price FLOAT,
        calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Insert the data
sql = "INSERT INTO fuel_averages (fuel_type, average_price) VALUES (%s, %s)"
values = ("B7P", national_avg)

cursor.execute(sql, values)
db.commit()

print(f"Successfully saved B7P average ({national_avg:.2f}) to MariaDB!")