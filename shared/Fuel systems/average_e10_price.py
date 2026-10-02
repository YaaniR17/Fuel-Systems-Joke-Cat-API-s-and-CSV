import pandas as pd
import matplotlib.pyplot as plt
import mysql.connector

fuel = pd.read_csv("UpdatedFuelPrice-1790866800131.csv", usecols=['forecourts.fuel_price.E10'])

fuel.columns = ['E10_Price']
fuel = fuel.dropna(subset=['E10_Price'])

price_counts = fuel['E10_Price'].value_counts().sort_index()
national_avg = fuel['E10_Price'].mean()
print(f"The average E10 price is: {national_avg:.2f}")

price_counts.plot(kind='bar')
plt.title("Number of Forecourts per E10 Price Point")
plt.xlabel("Price (E10)")
plt.ylabel("Number of Forecourts")
plt.show()

db = mysql.connector.connect(
  host="127.0.0.1",
  user="admin",
  password="password123",
  database="fuel_db"
)
cursor = db.cursor()

# Insert the data for Standard Unleaded (E10)
sql = "INSERT INTO fuel_averages (fuel_type, average_price) VALUES (%s, %s)"
values = ("E10", float(national_avg))

cursor.execute(sql, values)
db.commit()

print(f"Successfully saved E10 average to MariaDB!")