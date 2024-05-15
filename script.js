// JavaScript code for currency conversion
document.getElementById('convert-btn').addEventListener('click', async () => {
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
    const amount = document.getElementById('amount').value;
  
    try {
      const rate = await getExchangeRate(fromCurrency, toCurrency);
        const convertedAmount = amount * rate;
  ).then(rate => {
        const convertedAmount = amount * rate;
  
        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(4)} ${toCurrency}`;
  
        // Update chart
        updateChart(fromCurrency, toCurrency, rate);
      }).catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('result').innerText = 'Error fetching data. Please try again later.';
      });
  });
  
  document.getElementById('amount').addEventListener('input', async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from').value; // Getting the 'from' currency
    const toCurrency = document.getElementById('to').value; // Getting the 'to' currency
  
    if (!isNaN(amount)) {
      try {
        const rate = await getExchangeRate(fromCurrency, toCurrency); // Getting exchange rate based on 'from' and 'to' currencies
        const convertedAmount = amount * rate;
  
        document.getElementById('usd-amount').value = convertedAmount.toFixed(4);
        document.getElementById('usd-result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(4)} ${toCurrency}`;
      } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('usd-result').innerText = 'Error fetching data. Please try again later.';
      }
    } else {
      document.getElementById('usd-amount').value = ''; // Clear value if input is not a number
      document.getElementById('usd-result').innerText = '';
    }
  });
  
  async function getExchangeRate(fromCurrency, toCurrency) {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    if (data && data.rates && data.rates[toCurrency]) {
      return data.rates[toCurrency];
    } else {
      throw new Error('Exchange rate not available.');
    }
  }
  
  function updateChart(fromCurrency, toCurrency, rate) {
    const pair = `${fromCurrency}_${toCurrency}`;
  
    // Create chart if not already created
    if (!chartInstances[pair]) {
      const canvas = document.createElement('canvas');
      canvas.id = `chart-${pair}`;
      document.getElementById('result').appendChild(canvas);
  
      const ctx = canvas.getContext('2d');
      chartInstances[pair] = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: `${fromCurrency}/${toCurrency}`,
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'minute'
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          }
        }
      });
    }
  
    // Update chart data
    const chart = chartInstances[pair];
    const now = new Date();
    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(rate);
    chart.update();
  }
  