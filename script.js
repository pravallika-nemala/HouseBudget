function calculateRepayments() {
  const amount = parseFloat(document.getElementById('amount').value);
  const term = parseFloat(document.getElementById('term').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  const type = document.querySelector('input[name="type"]:checked')?.value;

  if (isNaN(amount) || isNaN(term) || isNaN(rate) || !type) {
    document.getElementById('results').innerHTML = `<h3 style="color: red;">Please fill in all fields correctly.</h3>`;
    return;
  }

  const months = term * 12;
  let monthlyRepayment, totalRepayment;

  if (type === 'repayment') {
    const monthlyRate = rate / 12;
    monthlyRepayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    totalRepayment = monthlyRepayment * months;
  } else {
    monthlyRepayment = (amount * rate) / 12;
    totalRepayment = monthlyRepayment * months;
  }

  const gbpMonthly = monthlyRepayment.toFixed(2);
  const gbpTotal = totalRepayment.toFixed(2);

  document.getElementById('results').innerHTML = `
    <h3>Your results</h3>
    <div class="output">
      <p>Your monthly repayments:</p>
      <span style="font-size: 2rem; color: #cce200;">£${gbpMonthly}</span><hr>
      <p>Total you'll repay over the term:</p>
      <strong>£${gbpTotal}</strong>

      <div class="currency-convert">
        <label for="currency">Convert to:</label>
        <select id="currency" onchange="convertCurrency(${gbpMonthly}, ${gbpTotal})">
          <option value="">-- Select Currency --</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="INR">INR (₹)</option>
          <option value="JPY">JPY (¥)</option>
        </select>
        <div id="convertedOutput"></div>
      </div>
    </div>
  `;
}

function convertCurrency(monthly, total) {
  const currency = document.getElementById("currency").value;
  const rates = {
    USD: 1.27,
    EUR: 1.17,
    INR: 106.25,
    JPY: 200.17
  };

  if (currency && rates[currency]) {
    const convertedMonthly = (monthly * rates[currency]).toFixed(2);
    const convertedTotal = (total * rates[currency]).toFixed(2);
    document.getElementById("convertedOutput").innerHTML = `
      <hr>
      <p>Monthly in ${currency}: <strong>${getSymbol(currency)}${convertedMonthly}</strong></p>
      <p>Total in ${currency}: <strong>${getSymbol(currency)}${convertedTotal}</strong></p>
    `;
  } else {
    document.getElementById("convertedOutput").innerHTML = "";
  }
}

function getSymbol(code) {
  const symbols = {
    USD: "$",
    EUR: "€",
    INR: "₹",
    JPY: "¥"
  };
  return symbols[code] || "";
}

function clearAll() {
  document.getElementById('amount').value = '';
  document.getElementById('term').value = '';
  document.getElementById('rate').value = '';
  document.querySelector('input[name="type"][value="repayment"]').checked = false;
  document.getElementById('results').innerHTML = `
    <center>
      <img src="image.png" height="300" width="300" />
      <h3>Results shown here</h3>
      <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
    </center>
  `;
}