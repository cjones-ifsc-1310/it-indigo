function calculate() {
    console.log("CALCULATE CLICKED"); // 👈 add this test line

    if ($("#myform").valid()) {

        let op1 = parseFloat(document.getElementById("Operand1").value);
        let op2 = parseFloat(document.getElementById("Operand2").value);

        let selected = document.querySelector('input[name="Operator"]:checked');

        if (!selected) {
            document.getElementById("Result").innerHTML = "Please select an operator";
            return;
        }

        let operator = selected.value;

        if (operator === "Divide" && op2 === 0) {
            document.getElementById("Result").innerHTML = "Cannot divide by zero";
            return;
        }

        let result;

        if (operator === "Add") {
            result = op1 + op2;
        } else if (operator === "Subtract") {
            result = op1 - op2;
        } else if (operator === "Multiply") {
            result = op1 * op2;
        } else if (operator === "Divide") {
            result = op1 / op2;
        }

        document.getElementById("Result").innerHTML = result;
    }
}
function clearform() {
    console.log("CLEAR CLICKED"); // test

    document.getElementById("Operand1").value = "";
    document.getElementById("Operand2").value = "";
    document.getElementById("Result").innerHTML = "";

    // also clear radio buttons (you forgot this 👇)
    let radios = document.querySelectorAll('input[name="Operator"]');
    radios.forEach(radio => radio.checked = false);
}