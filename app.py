import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # CORS 설정 추가

# Hugging Face API 정보
HF_API_URL = "https://api-inference.huggingface.co/models/google/gemma-2b"
HF_API_KEY = os.getenv("HF_API_KEY")  # 환경 변수에서 API 키 가져오기

if not HF_API_KEY:
    raise ValueError("HF_API_KEY 환경 변수가 설정되지 않았습니다.")

# API 요청 함수
def query_huggingface(payload):
    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    response = requests.post(HF_API_URL, headers=headers, json=payload)
    
    if response.status_code != 200:
        return {"error": f"Hugging Face API Error: {response.status_code}", "details": response.text}
    
    return response.json()

# 기본 페이지
@app.route('/')
def home():
    return jsonify(message="Hello, this is a Hugging Face API test!")

# Hugging Face 모델 호출 API
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get("input", "")

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    # API에 요청 보냄
    payload = {"inputs": user_input}
    response = query_huggingface(payload)

    return jsonify(response)

# Flask 서버 실행
if __name__ == "__main__":
    app.run(debug=True)
