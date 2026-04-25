function setupCalculator(config) {
  const select = document.getElementById(config.selectId);
  const output = document.getElementById(config.outputId);
  const box = document.getElementById(config.boxId);

  select.addEventListener("change", () => {
    const value = parseInt(select.value);

    if (!value) {
      box.classList.remove("active");
      output.textContent = "$0.00";
      return;
    }

    const total = config.calculate(value);
    output.textContent = `$${total.toFixed(2)}`;
    box.classList.add("active");
  });
}
setupCalculator({
  selectId: "quantity",
  outputId: "total",
  boxId: "canoe-result",
  calculate: (qty) => qty * 67 * 1.095
});