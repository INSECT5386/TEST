async function getGptResponse() {
  const response = await fetch('https://orange-bar-f327.myageu4.workers.dev', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: 'Your question here' })
  });

  const data = await response.json();
  console.log(data);
}
