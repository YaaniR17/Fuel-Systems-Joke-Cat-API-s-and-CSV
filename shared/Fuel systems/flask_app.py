from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/api/flask/fuel', methods=['GET'])
def get_fuel_data():
    try:
        db = mysql.connector.connect(
            host="127.0.0.1",
            user="admin",
            password="password123",
            database="fuel_db"
        )
        cursor = db.cursor(dictionary=True) 
        cursor.execute("SELECT * FROM fuel_averages ORDER BY calculated_at DESC")
        rows = cursor.fetchall()
        db.close()
        
        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)