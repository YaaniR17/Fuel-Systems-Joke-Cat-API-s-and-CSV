import pandas as pd
import matplotlib.pyplot as plt
import mysql.connector

fuel = pd.read_csv("UpdatedFuelPrice-1790866800131.csv", usecols=['forecourts.fuel_price.B7S'])

fuel.columns = ['B7S_Price']
fuel = fuel.dropna(subset=['B7S_Price'])

price_counts = fuel['B7S_Price'].value_counts().sort_index()
national_avg = fuel['B7S_Price'].mean()
print(f"The average B7S price is: {national_avg:.2f}")

price_counts.plot(kind='bar')
plt.title("Number of Forecourts per B7S Price Point")
plt.xlabel("Price (B7S)")
plt.ylabel("Number of Forecourts")
plt.show()

# Connect to MariaDB
db = mysql.connector.connect(
  host="127.0.0.1",
  user="admin",
  password="password123",
  database="fuel_db"
)
cursor = db.cursor()

# Insert the data for Standard Diesel (B7S)
sql = "INSERT INTO fuel_averages (fuel_type, average_price) VALUES (%s, %s)"
values = ("B7S", float(national_avg))

cursor.execute(sql, values)
db.commit()

print(f"Successfully saved B7S average to MariaDB!")
