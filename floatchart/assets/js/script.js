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

endSelect.addEventListener("change", () => {
  const selected = endSelect.value;

  renderRiver(selected); // 👈 add this

  if (!selected) {
    result.innerHTML = "";
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
});

const riverEl = document.getElementById("river");

function renderRiver(selected) {
  riverEl.innerHTML = "";

  const maxMiles = Math.max(...Object.values(floatData).map(t => t.miles));


  const points = [
    { name: "Ponca", miles: 0 },
    ...Object.entries(floatData).map(([name, data]) => ({
      name,
      miles: data.miles
    }))
  ];

points.forEach(p => {
  if (p.name === "Ponca") return; // 👈 hide from timeline

  const percent = (p.miles / maxMiles) * 100;

  const dot = document.createElement("div");
  dot.className = "river-dot" + (p.name === selected ? " active" : "");
  dot.style.left = `${percent}%`;

  dot.innerHTML = `
    <div class="circle"></div>
    <small>${p.name}</small>
  `;

  riverEl.appendChild(dot);
});
}