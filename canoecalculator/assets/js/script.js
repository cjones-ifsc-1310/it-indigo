const pricePerCanoe = 67;
const taxRate = 0.095;

const quantitySelect = document.getElementById("quantity");
const totalOutput = document.getElementById("total");
const resultBox = document.getElementById("result");

function calculateTotal() {
  const quantity = parseInt(quantitySelect.value);

  // ❗ Hide result if nothing selected
  if (!quantity) {
    resultBox.classList.remove("active");
    totalOutput.textContent = "$0.00";
    return;
  }

  const subtotal = quantity * pricePerCanoe;
  const total = subtotal + subtotal * taxRate;

  totalOutput.textContent = `$${total.toFixed(2)}`;

  // show result box
  resultBox.classList.add("active");
}

// init state (hidden)
resultBox.classList.remove("active");
totalOutput.textContent = "$0.00";

// listen for changes
quantitySelect.addEventListener("change", calculateTotal);