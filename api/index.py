from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.json
    print(data)  # 打印到控制台
    return jsonify(data)  # 以 JSON 的形式返回数据

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"