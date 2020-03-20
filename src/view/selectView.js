class SelectView {
  constructor(el, vendingModel) {
    this.element = el;
    this.vendingMachineModel = vendingModel;
    this.vendingMachineModel.subscribe(this.render.bind(this));

    this.init();
  }

  bindEvent() {
    const dial = this.element.querySelector(".choice_dial");

    dial.addEventListener("click", e => {
      if (e.target.tagName !== "BUTTON") return;
      const targetValue = e.target.innerText;
      const targetDataType = e.target.dataset.type;

      this.vendingMachineModel.addEventDial(targetValue, targetDataType);
    });
  }

  render({ targetValue, accumulatedAmount, productName, type }) {
    if (targetValue) {
      const stateLogEle = this.element.querySelector(".choice_message");
      const logText = this.renderStateLog({ targetValue, productName, type });
      stateLogEle.innerHTML += `<p>${logText}</p>`;

      this.renderAccumulateInput(accumulatedAmount);

      stateLogEle.scrollTop = stateLogEle.scrollHeight;
    } else {
      const stateLogEle = this.element.querySelector(".choice_message");
      const logText = this.renderStateLog({ type });
      stateLogEle.innerHTML += `<p>${logText}</p>`;

      this.renderAccumulateInput(accumulatedAmount);

      stateLogEle.scrollTop = stateLogEle.scrollHeight;
    }
  }

  renderStateLog({ targetValue, productName, type }) {
    let logText = "";
    if (type === "wallet") logText = `${targetValue}원이 투입되었습니다.`;
    else if (type === "dial") logText = `${productName}이(가) 나왔습니다.`;
    else if (type === "err") logText = `잔액이 부족합니다`;
    else if (type === "timer") logText = `잔돈이 반환됬습니다.`;
    return logText;
  }

  renderAccumulateInput(value) {
    const inputAmountEle = this.element.querySelector(".choice_product_price");
    inputAmountEle.innerText = value;
  }

  init() {
    this.bindEvent();
  }
}

export default SelectView;
