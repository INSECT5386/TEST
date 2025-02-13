async function getGptResponse() {
  const response = await fetch('https://orange-bar-f327.myageu4.workers.dev/');  // Cloudflare Worker의 URL
  if (!response.ok) {
    document.getElementById('gpt-response').textContent = '응답을 받을 수 없습니다.';
    return;
  }
  
  const data = await response.json();
  const gptMessage = data[0]?.generated_text || 'GPT-2 응답 없음';  // GPT-2의 출력 텍스트 추출

  // 응답을 HTML에 표시
  document.getElementById('gpt-response').textContent = gptMessage;
}

// 페이지 로드 시 GPT-2 응답 받아오기
window.onload = getGptResponse;

