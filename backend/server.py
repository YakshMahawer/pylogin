from flask import Flask, request, jsonify, session, render_template, redirect
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = os.urandom(24)

# MongoDB Atlas connection
client = MongoClient('mongodb+srv://yakshmahawer:5HC8ocB0UVne2Cwv@pylogin.ulcydbq.mongodb.net/?retryWrites=true&w=majority&appName=pylogin')
db = client.pylogin
users = db.users

@app.route('/')
def home():
    return render_template('index.html')
@app.route('/signup', methods=['POST'])
def signup():
    print('Ia m')
    data = request.get_json()
    print(data)
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    if users.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = generate_password_hash(password)
    users.insert_one({"username": username, "password": hashed_password})
    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    print('Ia m')
    data = request.get_json()
    print(data)
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        print("Username and password are required")
        return jsonify({"error": "Username and password are required"}), 400

    user = users.find_one({"username": username})
    if not user or not check_password_hash(user['password'], password):
        print("Invalid username or password")
        return jsonify({"error": "Invalid username or password"}), 401

    session['user'] = username
    print("Successs")
    return jsonify({"message": "Logged in successfully", "redirect": "/success"}), 200

@app.route('/success')
def success():
    if 'user' in session:
        return render_template('success.html')
    else: 
        return render_template('index.html')
@app.route('/logout', methods=['POST'])
def logout():
    print('Ia m')
    session.pop('user', None)
    return jsonify({"message": "Logged out successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)