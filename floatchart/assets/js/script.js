const floatData = {
  "Steel Creek": { miles: 2.7, price: 21 },
  "Kyles": { miles: 10.7, price: 40 },
  "Pruitt": { miles: 23.9, price: 55 },
  "Ozark": { miles: 29.9, price: 61 },
  "Erbie": { miles: 34.9, price: 92 },
  "Hasty": { miles: 50.3, price: 55 },
  "Carver": { miles: 56.3, price: 65 }
};

const endSelect = document.getElementById("end");
const result = document.getElementById("result");
const riverEl = document.getElementById("river");

endSelect.addEventListener("change", () => {
  const selected = endSelect.value;

  renderRiver(selected);

  // reset state
  if (!selected) {
    result.innerHTML = "";
    result.classList.remove("active");
    return;
  }

  const trip = floatData[selected];
  const hours = (trip.miles / 2).toFixed(1);

  const maxMiles = Math.max(...Object.values(floatData).map(t => t.miles));
  const percent = (trip.miles / maxMiles) * 100;

  result.innerHTML = `
    <h3>Ponca → ${selected}</h3>
    <p><strong>Float Miles:</strong> ${trip.miles} miles</p>

    <div class="route-bar">
      <div class="route-fill" style="width:${percent}%"></div>
    </div>

    <p>Approx. Float Time: ${hours} hours</p>
    <p><strong>Cost:</strong> <span class="price">$${trip.price.toFixed(2)}</span></p>
  `;

  result.classList.add("active");
});

function renderRiver(selected) {
  riverEl.innerHTML = "";

  const maxMiles = Math.max(...Object.values(floatData).map(t => t.miles));

  // ticks
  for (let i = 5; i <= maxMiles; i += 5) {
    const percent = (i / maxMiles) * 100;

    const tick = document.createElement("div");
    tick.className = "river-tick";
    tick.style.left = `${percent}%`;

    tick.innerHTML = `<span>${i}</span>`;
    riverEl.appendChild(tick);
  }

  // no selection = stop here
  if (!selected) return;

  const trip = floatData[selected];
  const percent = (trip.miles / maxMiles) * 100;

  const dot = document.createElement("div");
  dot.className = "river-dot active";
  dot.style.left = `${percent}%`;

  dot.innerHTML = `
    <div class="circle"></div>
    <small>${selected}</small>
  `;

  riverEl.appendChild(dot);
}