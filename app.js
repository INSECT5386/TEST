const express = require('express');
const app = express();
const port = 3000;

app.get('/api/hello', (req, res) => {
  res.send('Hello, World!');
});

// 0.0.0.0을 사용하여 모든 네트워크 인터페이스에서 접근 가능하게 설정
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
