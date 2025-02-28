// Map currencies to flag codes from ISO 3166-1 to alpha-2 to the icon library
const currencyToFlag = {
    EUR: "eu", // Euro (União Europeia)
    USD: "us", // United States Dollar
    BRL: "br", // Brazilian Real
    CHF: "ch", // Swiss Franc
    CNY: "cn", // Chinese Renminbi Yuan
    AUD: "au", // Australian Dollar
    CAD: "ca", // Canadian Dollar
    GBP: "gb", // British Pound
    JPY: "jp", // Japanese Yen
    HKD: "hk", // Hong Kong Dollar
    SGD: "sg", // Singapore Dollar
    NZD: "nz", // New Zealand Dollar
    KRW: "kr", // South Korean Won
    INR: "in", // Indian Rupee
    MXN: "mx", // Mexican Peso
    ZAR: "za", // South African Rand
    RUB: "ru", // Russian Rubles
    THB: "th", // Thai Baht
    SEK: "se", // Swedish Krona
    NOK: "no", // Norwegian Krone
    DKK: "dk", // Danish Krone
    MYR: "my", // Malaysian Ringgit
    IDR: "id", // Indonesian Rupiah
    PHP: "ph", // Philippine Peso
    PLN: "pl", // Polish Złoty
    BGN: "bg", // Bulgarian Lev
    CZK: "cz", // Czech Koruna
    HUF: "hu", // Hungarian Forint
    ILS: "il", // Israeli New Sheqel
    ISK: "is", // Icelandic Króna
    RON: "ro", // Romanian Leu
    TRY: "tr"  // Turkish Lira
};

const baseCurrencySelect = document.getElementById('baseCurrency');
const targetCurrencySelect = document.getElementById('targetCurrency');
const baseFlagElement = document.getElementById('baseFlag');
const targetFlagElement = document.getElementById('targetFlag');
const amountInput = document.getElementById('amount');
const currentRateElement = document.getElementById('currentRateElement');
const convertedAmount = document.getElementById('convertedAmount');

async function fetchCurrencies() {
    try {
        const response = await fetch("https://api.frankfurter.dev/v1/currencies");
        const currencies = await response.json();
        populateDropdowns(currencies);
        return;
    } catch (error) {
        console.error("Unable to retrieve data:", error);
        return {}; 
    }
}

let originalOptions = [];

function populateDropdowns(currencies) {   
    originalOptions = []; 
    for (const code in currencies) {
        const name = currencies[code];
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${name}`;
        originalOptions.push(option);
        baseCurrencySelect.appendChild(option.cloneNode(true));
        targetCurrencySelect.appendChild(option.cloneNode(true));
    }

    baseCurrencySelect.value = "EUR";
    targetCurrencySelect.value = "BRL";

    updateDropdownOptions(); 
    updateFlag(baseCurrencySelect, baseFlagElement);
    updateFlag(targetCurrencySelect, targetFlagElement);

    updateChart();
}

function updateDropdownOptions() {
    const baseSelected = baseCurrencySelect.value;
    const targetSelected = targetCurrencySelect.value;

    targetCurrencySelect.querySelectorAll("option").forEach(option => {
        option.disabled = (option.value === baseSelected);
    });

    baseCurrencySelect.querySelectorAll("option").forEach(option => {
        option.disabled = (option.value === targetSelected);
    });
}


function updateFlag(selectElement, flagElement) {
    const currency = selectElement.value.toUpperCase();
    const flagCode = currencyToFlag[currency] || 'eu';
    flagElement.innerHTML = `<span class="flag-icon flag-icon-${flagCode}"></span>`;
}

// Função para buscar taxa de câmbio
function fetchExchangeRate(base, target) {
    const date30DaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; //more efficient
    const url = `https://api.frankfurter.dev/v1/${date30DaysAgo}..?from=${base}&to=${target}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').textContent = JSON.stringify(data);
            const rates = Object.values(data.rates).map(rate => rate[target]); // Corrigido para array
            const dates = Object.keys(data.rates);
            const lastRate = rates[rates.length - 1];
            updateTextSnippet(lastRate, base, target);
            updateChartWithRate(dates, rates);
        });
}

function updateTextSnippet(rate, base, target) {
    const amount = parseFloat(amountInput.value) || 0;
    const convertedAmountValue = (amount * rate).toFixed(2);
    convertedAmount.value = convertedAmountValue;
    const time_now = new Date().toLocaleString();
    currentRateElement.textContent = `${time_now} | 1 ${base} = ${rate} ${target}`;
}

// Chart instance (start ChatGPT)
// Comme c'est un code pas obligetoire, nous avons décidé de utiliser le code de ChatGPT pour le chart
let chartInstance = null;

function updateChartWithRate(dates, rates) {
    const ctx = document.getElementById('exchangeChart').getContext('2d');
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `${baseCurrencySelect.value} to ${targetCurrencySelect.value} Exchange Rate`, // Corrigido
                data: rates,
                borderColor: '#3b82f6',
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
}
// End ChartIntance (end ChatGPT)

/**
 * This function is triggered when the user changes the base currency or target currency.
 * It updates the flag, dropdown options, and chart.
 */
function updateChart() {
    const baseCurrency = baseCurrencySelect.value;
    const targetCurrency = targetCurrencySelect.value;
    fetchExchangeRate(baseCurrency, targetCurrency);
}

baseCurrencySelect.addEventListener('change', () => {
    updateDropdownOptions();
    updateFlag(baseCurrencySelect, baseFlagElement);
    updateChart();
});

targetCurrencySelect.addEventListener('change', () => {
    updateDropdownOptions();
    updateFlag(targetCurrencySelect, targetFlagElement);
    updateChart();
});

amountInput.addEventListener('input', updateChart);

fetchCurrencies();