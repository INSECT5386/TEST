# wsgi.py
from app import app  # app.py에 있는 Flask 애플리케이션 객체를 가져옵니다.

if __name__ == "__main__":
    app.run()
