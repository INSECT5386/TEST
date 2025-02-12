async function sendMessageToAPI(userMessage) {
  try {
    const response = await fetch('https://naturalink.netlify.app/.netlify/functions/huggingface', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userMessage })
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    return { error: error.message };
  }
}

// 버튼 클릭 시 메시지 보내기
document.getElementById('sendMessageButton').addEventListener('click', () => {
  const userMessage = document.getElementById('userMessage').value;
  sendMessageToAPI(userMessage).then(response => {
    if (response.error) {
      document.getElementById('chatbotResponse').innerText = '에러 발생: ' + response.error;
    } else {
      document.getElementById('chatbotResponse').innerText = '챗봇 응답: ' + response.answer;
    }
  });
});
