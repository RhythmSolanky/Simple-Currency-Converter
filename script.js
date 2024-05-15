document.getElementById('convert-btn').addEventListener('click', async () => {
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
    const amount = document.getElementById('amount').value;
  
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const rate = data.rates[toCurrency];
      const convertedAmount = amount * rate;
  
      document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('result').innerText = 'Error fetching data. Please try again later.';
    }
  });
  