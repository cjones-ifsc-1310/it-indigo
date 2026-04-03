function ShowResults() {

    // 1. Clear previous results/errors first
    clearformResultsOnly();

    let base = document.getElementById("base").value;
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;

    // 2. Basic validation
    if (base === "") {
        document.getElementById("BaseCurrencyError").innerHTML = "Select a base currency";
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
}
    

    // 3. Loop through 5 currencies
    for (let i = 1; i <= 5; i++) {

        let currency = document.getElementById("convert" + i).value;
        let resultSpan = document.getElementById("result" + i);
        

        if (currency !== "") {

            // Optional: prevent same currency
            if (currency === base) {
                resultSpan.innerHTML = "Cannot convert to same currency";
                continue;
            }

            let pair = base + currency;

            let url = `https://api.polygon.io/v2/aggs/ticker/C:${pair}/range/1/day/${startDate}/${endDate}?apiKey=KC5wkc2aYrMWut6FIH_MeRJCIMQ17eJe`;

            // Debug check
            console.log(url);

            // 4. Show loading message
            resultSpan.innerHTML = "Loading...";

            // 5. AJAX call
            $.ajax({
                url: url,
                method: "GET",
                success: function (data) {

                    // ⚠️ This depends on API response structure
                    if (data.results && data.results.length > 0) {

                        // Example: last closing value
                        let lastValue = data.results[data.results.length - 1].c;

                        resultSpan.innerHTML = `1 ${base} = ${lastValue} ${currency}`;

                    } else {
                        resultSpan.innerHTML = "No data found";
                    }
                },
                error: function () {
                    resultSpan.innerHTML = "Error retrieving data";
                }
            });

        }
    }


function clearform() {

    document.getElementById("myform").reset();

    clearformResultsOnly();
}
function clearformResultsOnly() {

    document.getElementById("BaseCurrencyError").innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        document.getElementById("result" + i).innerHTML = "";
        document.getElementById("ConvertCurrencyError" + i).innerHTML = "";
    }
}
