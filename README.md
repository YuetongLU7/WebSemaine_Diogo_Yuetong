<div style="display: flex; align-items: center;" >
    <img src="./assets/exchange.png" alt="Currency Exchange" width="60" style="margin-right: 10px; margin-bottom: 13px;">
    <h1>Currency Converter Web Page</h1>
</div>


# Currency Converter 🌍

🌐 **Choose your language / Choisir la langue :**  
🇬🇧 English Version (current)  
🇫🇷 [Version Française](README_FR.md)

---

## Overview
A free and simple currency converter web application that allows users to calculate exchange rates dynamically using real-time data. This static web application fetches exchange rates from the Frankfurter API and displays historical exchange trends in an interactive chart.

## Features
- 📌 **Real-time exchange rates** using the [Frankfurter API](https://www.frankfurter.app/)
- 📊 **Interactive exchange rate chart** powered by Chart.js
- 🌍 **Support for multiple currencies** with automatic country flag display
- 🖥️ **Fully responsive design** using Tailwind CSS

## Technologies Used
- **HTML, CSS, JavaScript** (Frontend development)
- **Tailwind CSS** (Styling framework)
- **Chart.js** (Data visualization)
- **Frankfurter API** (Currency exchange rate provider)

## Installation & Usage
This project is a static webpage and does not require any installation. You can simply clone the repository and open `index.html` in your browser.

### Clone Repository
```sh
git clone https://github.com/YuetongLU7/WebSemaine_Diogo_Yuetong.git
cd WebSemaine_Diogo_Yuetong
```

### Open Locally
Open `index.html` in your browser:
```sh
open index.html
```
Or if you are using a local server:
```sh
python -m http.server 8000  # Python 3
```
Then visit `http://localhost:8000` in your browser.

## API Integration
The exchange rates are fetched from the Frankfurter API. The API call format:
```js
fetch(`https://api.frankfurter.app/latest?base=USD&symbols=EUR,GBP,JPY`)
  .then(response => response.json())
  .then(data => console.log(data));
```

## Example Screenshot
![App Screenshot](./assets/screenshot.png)

## Improvements

### 1️⃣ API Nesting: Efficient Data Fetching
We implemented **API nesting** to optimize data retrieval. The process ensures that the **currency selection dropdowns are updated first**, and only after this step does the system request the latest exchange rate. This prevents unnecessary API calls and ensures smoother execution.

### 2️⃣ Dynamic Dropdown Update: Populating Currency Options Dynamically
Instead of hardcoding available currencies, we now retrieve them dynamically from the **Frankfurter API**. This ensures that our dropdown lists always reflect the most up-to-date selection of supported currencies.

### 3️⃣ Preventing Selection of the Same Currency
We implemented logic to prevent users from selecting **the same currency** as both the base and target. If a user selects the same currency in both fields, the system **automatically selects an alternative valid option** to maintain correctness.

### 4️⃣ Fetching Exchange Rates: `fetchExchangeRate()`
This function retrieves exchange rate data for the selected currency pair and stores the most recent exchange rate for conversion.

### 5️⃣ Real-Time Rate Display: `updateTextSnippet()`
This function updates the displayed exchange rate in real-time, showing the **current timestamp** and the **exchange rate for 1 unit** of the base currency.

### 6️⃣ Historical Exchange Rate Chart: `updateChartWithRate()`
The chart visualizes exchange rate fluctuations over the past **30 days**, providing valuable market insights. The **x-axis** represents the **dates**, and the **y-axis** represents the exchange rate.

### 7️⃣ Clean Code & Best Practices
We follow **Uncle Bob's Clean Code Principles**, emphasizing **single-responsibility functions** and modular, maintainable code. We also use **uv** for Python environment management.

---

## License
This project is open-source and free to use under the MIT License.

---
💡 **Contributions are welcome!** 
All the packages are routed trough the CDN of npm, which can cause errors if for some reason is out of service.

If you find any issues or want to improve the project, feel free to open a pull request.

