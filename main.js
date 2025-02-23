const currencies = ['eur', 'usd', 'brl', 'chf'];

// Map currencies to flag codes
const currencyToFlag = {
    eur: 'eu', 
    usd: 'us', 
    brl: 'br',
    chf: 'ch'  // Switzerland
};

const baseCurrencySelect = document.getElementById('baseCurrency');
const targetCurrencySelect = document.getElementById('targetCurrency');
const baseFlagElement = document.getElementById('baseFlag');
const targetFlagElement = document.getElementById('targetFlag');

function populateDropdown(selectElement, defaultValue) {
    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.text = currency.toUpperCase();
        selectElement.appendChild(option);
    });
    selectElement.value = defaultValue || 'eur'; 
}

populateDropdown(baseCurrencySelect, 'eur');
populateDropdown(targetCurrencySelect, 'brl'); 

function updateFlag(selectElement, flagElement) {
    const currency = selectElement.value;
    const flagCode = currencyToFlag[currency] || 'eu';
    // TODO : this is dengerous because it allows for XSS attacks. Can we update just the class name?
    flagElement.innerHTML = `<span class="flag-icon flag-icon-${flagCode}"></span>`; 
}

// Event listeners for flag updates
baseCurrencySelect.addEventListener('change', () => updateFlag(baseCurrencySelect, baseFlagElement));
targetCurrencySelect.addEventListener('change', () => updateFlag(targetCurrencySelect, targetFlagElement));

async function fetchHistoricalData(base, currency) {
    const startDate = new Date();
    document.getElementById('currentDay').textContent = startDate; //update the time in UI

    startDate.setDate(startDate.getDate() - 30);
    const startDateStr = startDate.toISOString().split('T')[0];
    const url = `https://api.frankfurter.dev/v1/${startDateStr}..?base=${base}&symbols=${currency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('response').textContent = JSON.stringify(data);
        if (data.error) {
            throw new Error(data.error);
        }
        const dates = Object.keys(data.rates);
        const rates = dates.map(date => data.rates[date][currency.toUpperCase()]);
        return { dates, rates, latestRate: rates[rates.length - 1] || 0 };
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return { dates: [], rates: [], latestRate: 0 };
    }
}

// Chart instance (start ChatGPT)
// Comme c'est un code pas obligetoire, nous avons décidé de utiliser le code de ChatGPT pour le chart
let chartInstance = null;

// Function to update the chart and conversion
async function updateChart() {
    const baseCurrency = baseCurrencySelect.value;
    const targetCurrency = targetCurrencySelect.value;
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const { dates, rates, latestRate } = await fetchHistoricalData(baseCurrency, targetCurrency);

    // Update current rate
    document.getElementById('currentRate').textContent = latestRate.toFixed(4) || 'N/A';

    // Update converted amount
    const convertedAmount = (amount * latestRate).toFixed(2);
    document.getElementById('convertedAmount').value = isNaN(convertedAmount) ? '0.00' : convertedAmount;

    const ctx = document.getElementById('exchangeChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `${baseCurrency.toUpperCase()} to ${targetCurrency.toUpperCase()} Exchange Rate`,
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
// End ChartIntance (end ChatGPT)

let currentData = null;
updateChart().then(data => currentData = data);

const amountInput = document.getElementById('amount');
baseCurrencySelect.addEventListener('change', updateChart);
targetCurrencySelect.addEventListener('change', updateChart);
amountInput.addEventListener('change', updateChart);
