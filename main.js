// Map currencies to flag codes
const currencyToFlag = {
    EUR: "eu", USD: "us", BRL: "br", CHF: "ch", CNY: "cn",
        AUD: "au", CAD: "ca", GBP: "gb", JPY: "jp", HKD: "hk",
        SGD: "sg", NZD: "nz", KRW: "kr", INR: "in", MXN: "mx",
        ZAR: "za", RUB: "ru", THB: "th", SEK: "se", NOK: "no",
        DKK: "dk", MYR: "my", IDR: "id", PHP: "ph", PLN: "pl"
};

const baseCurrencySelect = document.getElementById('baseCurrency');
const targetCurrencySelect = document.getElementById('targetCurrency');
const baseFlagElement = document.getElementById('baseFlag');
const targetFlagElement = document.getElementById('targetFlag');

async function fetchCurrencies() {
    try {
        const response = await fetch("https://api.frankfurter.dev/v1/currencies");
        const currencies = await response.json();
        return currencies;
    } catch (error) {
        console.error("Unable to retrieve data:", error);
        return {}; 
    }
}

async function populateDropdowns() {
    const currencies = await fetchCurrencies();

    if (Object.keys(currencies).length === 0) {
        console.error("No data");
        return;
    }

    for (const [code, name] of Object.entries(currencies)) {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');

        option1.value = code;
        option1.textContent = `${code} - ${name}`;
        option2.value = code;
        option2.textContent = `${code} - ${name}`;

        baseCurrencySelect.appendChild(option1);
        targetCurrencySelect.appendChild(option2);
    }

    baseCurrencySelect.value = "EUR"; 
    targetCurrencySelect.value = "BRL"; 

    updateFlag(baseCurrencySelect, baseFlagElement);
    updateFlag(targetCurrencySelect, targetFlagElement);

    updateChart();
}


function updateFlag(selectElement, flagElement) {
    const currency = selectElement.value.toUpperCase(); 
    const flagCode = currencyToFlag[currency] || 'eu'; 
    flagElement.innerHTML = `<span class="flag-icon flag-icon-${flagCode}"></span>`;
}

// Event listeners for flag updates
baseCurrencySelect.addEventListener('change', () => updateFlag(baseCurrencySelect, baseFlagElement));
targetCurrencySelect.addEventListener('change', () => updateFlag(targetCurrencySelect, targetFlagElement));

async function fetchHistoricalData(base, currency) {
    if (!base || !currency) {
        console.error("Erreur: base ou currency est vide !");
        return { dates: [], rates: [], latestRate: 0 };
    }

    // Directly set the exchange rate to 1.00 without requesting the API to avoid errors when the API returns nothing.
    if (base === currency) {
        return { dates: [], rates: [], latestRate: 1.00 };  
    }
    
    const startDate = new Date();
    document.getElementById('currentDay').textContent = startDate; //update the time in UI

    startDate.setDate(startDate.getDate() - 30);
    const startDateStr = startDate.toISOString().split('T')[0];
    //Make sure startDateStr is in the correct date format (YYYY-MM-DD)
    const url = `https://api.frankfurter.dev/v1/${startDateStr}..?base=${base}&symbols=${currency}`;
    console.log("Requête API:", url);
    
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
    
    if (!baseCurrency || !targetCurrency) {
        console.warn("Sélectionnez une devise avant de mettre à jour le graphique.");
        return;
    }
    
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const { dates, rates, latestRate } = await fetchHistoricalData(baseCurrency, targetCurrency);

    if (latestRate === 0) {
        console.warn("Pas de taux de change disponible.");
        return;
    }

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
// baseCurrencySelect.addEventListener('change', updateChart);
// targetCurrencySelect.addEventListener('change', updateChart);
// amountInput.addEventListener('input', updateChart); 

populateDropdowns().then(() => {
    baseCurrencySelect.addEventListener('change', updateChart);
    targetCurrencySelect.addEventListener('change', updateChart);
    amountInput.addEventListener('input', updateChart); //Update the chart as the user types
});