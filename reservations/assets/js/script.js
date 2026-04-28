"use strict";

/* =========================
   DATA
========================= */

const floatData = {
  "Steel Creek": { miles: 2.7, price: 21 },
  "Kyles": { miles: 10.7, price: 40 },
  "Pruitt": { miles: 23.9, price: 55 },
  "Ozark": { miles: 29.9, price: 61 },
  "Erbie": { miles: 34.9, price: 92 },
  "Hasty": { miles: 50.3, price: 55 },
  "Carver": { miles: 56.3, price: 65 }
};

/* =========================
   ELEMENTS
========================= */

const shuttleEl = document.getElementById("shuttle");
const riverEl = document.getElementById("river");
const shuttleBox = document.getElementById("shuttleBreakdown");

const checkinEl = document.getElementById("checkin");
const checkoutEl = document.getElementById("checkout");
const nightsDisplay = document.getElementById("nightsDisplay");

const canoesEl = document.getElementById("canoes");
const canoeDaysEl = document.getElementById("canoeDays");

const cabinPriceEl = document.getElementById("cabinPrice");
const canoePriceEl = document.getElementById("canoePrice");
const grandTotalEl = document.getElementById("grandTotal");
const breakdownEl = document.getElementById("breakdown");

const canoeBox = document.getElementById("canoeBreakdown");
const cabinBox = document.getElementById("cabinBreakdown");

/* =========================
   PRICING
========================= */

const CABIN_RATE = 195;
const CANOE_RATE = 67;
const TAX_RATE = 0.095;

/* =========================
   INIT DEFAULTS
========================= */

window.addEventListener("load", () => {
  updateAll();
});

/* =========================
   HELPERS
========================= */

function getNights() {
  if (!checkinEl?.value || !checkoutEl?.value) return 0;

  const start = new Date(checkinEl.value);
  const end = new Date(checkoutEl.value);

  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

/* =========================
   MASTER UPDATE
========================= */

function updateAll() {
  calculate();
  renderRiver();
}

/* =========================
   MAIN CALC
========================= */

function calculate() {
  const nights = getNights();

  const canoeQty = parseInt(canoesEl?.value || 0);
  const canoeDays = parseInt(canoeDaysEl?.value || 0);

  const hasCanoe = canoeQty > 0 && canoeDays > 0;
  const hasCabin = nights > 0;
  const hasShuttle = shuttleEl?.value && floatData[shuttleEl.value];

  const cabin = hasCabin ? nights * CABIN_RATE : 0;
  const canoe = hasCanoe ? canoeQty * canoeDays * CANOE_RATE : 0;
  const shuttle = hasShuttle ? floatData[shuttleEl.value].price : 0;

  const subtotal = cabin + canoe + shuttle;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const maxMiles = Math.max(...Object.values(floatData).map(t => t.miles));

  /* Nights UI */
  if (nightsDisplay) {
    nightsDisplay.textContent = hasCabin ? `${nights} nights` : "0 nights";
  }

  /* Cabin UI */
  if (cabinPriceEl) cabinPriceEl.textContent = `$${cabin.toFixed(2)}`;
  if (cabinBox) cabinBox.classList.toggle("active", hasCabin);

  /* Canoe UI */
  if (canoePriceEl) canoePriceEl.textContent = `$${canoe.toFixed(2)}`;
  if (canoeBox) canoeBox.classList.toggle("active", hasCanoe);

  /* Shuttle UI */
  if (shuttleBox) {
    if (hasShuttle) {
      const trip = floatData[shuttleEl.value];

      const hours = Math.round((trip.miles / 2.5) * 10) / 10;
      const percent = (trip.miles / maxMiles) * 100;

      shuttleBox.classList.add("active");

      shuttleBox.innerHTML = `
        <p><strong>${shuttleEl.value}</strong></p>
        <p>${trip.miles} miles</p>

        <!-- SECOND ANIMATED ROUTE MAP -->
        <div class="shuttle-route-v2">
          <div class="route-track-v2"></div>
          <div class="route-fill-v2" style="width:${percent}%"></div>
          <div class="route-dot-v2" style="left:${percent}%"></div>
        </div>

        <p>${hours} hour float (est.)</p>
        <p class="price">$${trip.price.toFixed(2)}</p>
      `;
    } else {
      shuttleBox.classList.remove("active");
      shuttleBox.innerHTML = "";
    }
  }

  /* TOTAL BREAKDOWN */
  if (breakdownEl) {
    let html = "";

    if (hasCabin) html += `<p>Cabin: $${cabin.toFixed(2)}</p>`;
    if (hasCanoe) html += `<p>Canoe: $${canoe.toFixed(2)}</p>`;
    if (hasShuttle) html += `<p>Shuttle: $${shuttle.toFixed(2)}</p>`;

    if (subtotal > 0) {
      html += `<p>Tax: $${tax.toFixed(2)}</p>`;
      html += `<p style="border-top:1px solid #F26E22; margin-top:8px; padding-top:8px;">
        Total Price: $${total.toFixed(2)}
      </p>`;
    }

    breakdownEl.innerHTML = html;
  }

  if (grandTotalEl) {
    grandTotalEl.textContent = subtotal > 0
      ? `$${total.toFixed(2)}`
      : "$0.00";
  }
}

/* =========================
   SHUTTLE MAP
========================= */

function renderRiver() {
  if (!riverEl) return;

  riverEl.classList.add("progress-mode");
  riverEl.innerHTML = "";

  const entries = Object.entries(floatData);
  const max = Math.max(...entries.map(([_, t]) => t.miles));

// snap max UP to nearest 5 so spacing is clean
const maxSnapped = Math.ceil(max / 5) * 5;

for (let i = 0; i <= maxSnapped; i += 5) {
  const tick = document.createElement("div");
  tick.className = "river-tick";

  const percent = (i / maxSnapped) * 100;
  tick.style.left = `${percent}%`;

  tick.innerHTML = `<span>${i}</span>`;
  riverEl.appendChild(tick);
}

  /* LABELS */
  const inset = 8; // general safe zone

entries.forEach(([name, data], index) => {
  const label = document.createElement("div");
  label.className = "river-label";

  const rawPercent = (data.miles / max) * 100;

  let percent;

  const isFirst = index === 0;
  const isLast = index === entries.length - 1;

  if (isFirst) {
    // push slightly OUTWARD toward left edge
    percent = rawPercent * 0.85;
  } else if (isLast) {
    // push slightly OUTWARD toward right edge
    percent = 100 - (100 - rawPercent) * 0.85;
  } else {
    // keep safe inset for middle labels
    percent = inset + (rawPercent * (100 - inset * 2)) / 100;
  }

  label.style.left = `${percent}%`;
  label.innerHTML = `<small>${name}</small>`;

  riverEl.appendChild(label);
});

  /* PROGRESS FILL */
  if (shuttleEl?.value && floatData[shuttleEl.value]) {
    const trip = floatData[shuttleEl.value];

    const fill = document.createElement("div");
    fill.className = "river-fill";
    fill.style.width = `${(trip.miles / max) * 100}%`;

    riverEl.appendChild(fill);

    const marker = document.createElement("div");
    marker.className = "river-marker";
    marker.style.left = `${(trip.miles / max) * 100}%`;
    riverEl.appendChild(marker);
  }
}

/* =========================
   EVENTS
========================= */

checkinEl?.addEventListener("change", updateAll);
checkoutEl?.addEventListener("change", updateAll);
canoesEl?.addEventListener("change", updateAll);
canoeDaysEl?.addEventListener("change", updateAll);
shuttleEl?.addEventListener("change", updateAll);