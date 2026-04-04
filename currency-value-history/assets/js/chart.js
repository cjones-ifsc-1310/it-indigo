let chart; // global chart variable

// Show results button
function ShowResults() {
    clearformResultsOnly();

    let base = document.getElementById("base").value;
    let currency = document.getElementById("convert").value;
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;

    // Validation
    if (base === "") {
        alert("Select a base currency");
        return;
    }

    if (currency === "") {
        document.getElementById("ConvertCurrencyError1").innerHTML = "Select a currency";
        return;
    }

    if (currency === base) {
        alert("Cannot convert to the same currency");
        return;
    }

    if (startDate === "" || endDate === "") {
        alert("Please select both dates");
        return;
    }

    if (endDate < startDate) {
        alert("End date must be after start date");
        return;
    }

    let pair = `${base}-${currency}`;
    let apiKey = "KC5wkc2aYrMWut6FIH_MeRJCIMQ17eJe"; // Replace with your Polygon API key
    let url = `https://api.polygon.io/v2/aggs/ticker/C:${pair}/range/1/day/${startDate}/${endDate}?apiKey=${apiKey}`;

    $.ajax({
        url: url,
        method: "GET",
        success: function(data) {
            console.log("API Response:", data);

            if (data.results && data.results.length > 0) {
                let labels = [];
                let values = [];

                // Take every 5th point (adjust as needed)
                for (let i = 0; i < data.results.length; i += 5) {
                    let item = data.results[i];
                    let date = new Date(item.t).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    });
                    labels.push(date);
                    values.push(item.c);
                }

                createChart(labels, values, base, currency);
            } else {
                alert("No data found for this currency pair and date range");
            }
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error:", status, error);
            alert("Error fetching data. Check console for details.");
        }
    });
}

// Clear error labels (but not form values)
function clearformResultsOnly() {
    document.getElementById("BaseCurrencyError").innerHTML = "";
    document.getElementById("ConvertCurrencyError1").innerHTML = "";
}

// Draw the chart
function createChart(labels, values, base, currency) {
    let ctx = document.getElementById("currencyChart").getContext("2d");

    // Destroy old chart if it exists
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: `1 ${base} to ${currency}`,
                data: values,
                borderColor: "#6FB7B5",
                backgroundColor: "rgba(111, 183, 181, 0.2)",
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `${base} → ${currency}`,
                    font: { size: 20 }
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { maxRotation: 0, minRotation: 0, autoSkip: true, maxTicksLimit: 8 },
                    grid: { display: false }
                },
                y: {
                    title: { display: true, text: "Exchange Rate" },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(3);
                        }
                    }
                }
            }
        }
    });
}

// Clear form fields, errors, and chart
function clearform() {
    document.getElementById("myform").reset();
    clearformResultsOnly();

    if (chart) chart.destroy();
}