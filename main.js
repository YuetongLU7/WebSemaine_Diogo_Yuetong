const currencies = ['USD', 'BRL', 'JPY', 'chf'];

 // Populate the currency dropdown
 const currencySelect = document.getElementById('currency');
 currencies.forEach(currency => {
     const option = document.createElement('option');
     option.value = currency;
     option.text = currency.toUpperCase();
     currencySelect.appendChild(option);
 });
 currencySelect.value = 'EUR'; // Default to EUR

 async function fetchHistoricalData(base, currency) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const startDateStr = startDate.toISOString().split('T')[0];
    console.log(startDateStr)
    const url = `https://api.frankfurter.dev/v1/${startDateStr}..?base=${base}&symbols=${currency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        if (data.error) {
            throw new Error(data.error);
        }
        const dates = Object.keys(data.rates);
        const rates = dates.map(date => data.rates[date][currency.toUpperCase()]);
        return { dates, rates };
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return { dates: [], rates: [] }; // Retorna arrays vazios em caso de erro
    }
}

 // Chart instance (to be updated)
 let chartInstance = null;

 // Function to update the chart
 async function updateChart(currency) {
     const { dates, rates } = await fetchHistoricalData(currency);

     const ctx = document.getElementById('exchangeChart').getContext('2d');
     
     // Destroy existing chart if it exists
     if (chartInstance) {
         chartInstance.destroy();
     }

     chartInstance = new Chart(ctx, {
         type: 'line',
         data: {
             labels: dates,
             datasets: [{
                 label: `Exchange Rate (${currency.toUpperCase()})`,
                 data: rates,
                 borderColor: '#3b82f6', // Tailwind's blue-500
                 backgroundColor: 'rgba(59, 130, 246, 0.1)',
                 fill: true,
                 tension: 0.4,
             }]
         },
         options: {
             responsive: true,
             scales: {
                 x: { title: { display: true, text: 'Date' } },
                 y: { title: { display: true, text: 'Exchange Rate' } }
             }
         }
     });

     // Return data for download
     return { dates, rates };
 }

 // Initial load with EUR
 let currentData = null;
 updateChart('eur').then(data => currentData = data);

 // Event listener for currency change
 currencySelect.addEventListener('change', (event) => {
     const selectedCurrency = event.target.value;
     updateChart(selectedCurrency).then(data => currentData = data);
 });

 // Download button functionality
 document.getElementById('download').addEventListener('click', () => {
     if (!currentData) {
         alert('No data available to download.');
         return;
     }
     const { dates, rates } = currentData;
     const csvContent = [
         'Date,Rate',
         ...dates.map((date, i) => `${date},${rates[i]}`)
     ].join('\n');
     const blob = new Blob([csvContent], { type: 'text/csv' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `exchange_rates_${currencySelect.value}.csv`;
     a.click();
     URL.revokeObjectURL(url);
 });