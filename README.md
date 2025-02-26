<table>
  <tr>
    <td><img src="./assets/exchange.png" alt="Currency Exchange" width="60" style="margin-right: 10px;"></td>
    <td><h1>Currency Converter Web Page</h1></td>
  </tr>
</table>

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
We implemented **API nesting** to optimize data retrieval. First, we populate the currency selection dropdowns by fetching available currencies dynamically from the **Frankfurter API**. Once the dropdowns are updated, we then proceed to fetch exchange rate data, ensuring **smooth execution** and avoiding unnecessary API calls.

### 2️⃣ Dynamic Dropdown Update: Populating Currency Options Dynamically
Previously, available currencies were hardcoded, which limited flexibility. Now, the dropdown lists are populated dynamically from the **Frankfurter API**, ensuring that users always have access to the latest currency options.

### 3️⃣ Preventing Selection of the Same Currency
To **prevent users from selecting the same currency** as both the base and target currency, we dynamically update the dropdown options:
   - When the user selects a base currency, that currency is **removed** from the target currency dropdown.
   - When the user selects a target currency, that currency is **removed** from the base currency dropdown.
   - If both are the same, the system **automatically selects an alternative valid currency**.

### 4️⃣ Fetching Exchange Rates: `fetchExchangeRate()`
This function retrieves exchange rate data for the selected currency pair by requesting data from the **Frankfurter API**. The function processes the returned JSON data and extracts relevant exchange rates for calculations.

### 5️⃣ Real-Time Rate Display: `updateTextSnippet()`
This function ensures real-time updates to the displayed exchange rate, showing **the exact timestamp** and the **exchange rate for 1 unit** of the base currency. This helps users track the most recent exchange rate.

### 6️⃣ Historical Exchange Rate Chart: `updateChartWithRate()`
The chart visualizes exchange rate fluctuations over the past **30 days**:
   - The **x-axis** represents **dates** (timeline of exchange rate changes).
   - The **y-axis** represents **exchange rates** (currency values over time).
   - The chart is dynamically updated each time the user selects a new currency pair.

### 7️⃣ Clean Code & Best Practices
We follow **Uncle Bob's Clean Code Principles**, ensuring:
   - **Single-responsibility functions** (each function has a distinct, well-defined purpose).
   - **Modular design** (functions are independent and reusable).
   - **Maintainability** (code is structured, clear, and scalable).
   - **Python environment management** using `uv`.

---

## License
This project is open-source and free to use under the MIT License.

---
💡 **Contributions are welcome!** 
All the packages are routed trough the CDN of npm, which can cause errors if for some reason is out of service.

If you find any issues or want to improve the project, feel free to open a pull request.
