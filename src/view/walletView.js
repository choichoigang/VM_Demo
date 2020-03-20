class WalletView {
  constructor(el, walletModel, vendingModel) {
    this.element = el;
    this.walletModel = walletModel;
    this.vendingMachineModel = vendingModel;

    this.walletModel.subscribe(this.render.bind(this));
    this.init();
  }

  bindEvent() {
    this.element.querySelector(".wallet_list").addEventListener("click", e => {
      const target = e.target;

      if (target.tagName !== "BUTTON") return;
      else if (e.target.nextElementSibling.innerText === "0") return;

      this.vendingMachineModel.timerModel.AccumulatedSum(e.target.value);

      clearTimeout(this.vendingMachineModel.timerModel.state.timer);
      this.vendingMachineModel.timerModel.state.timer = setTimeout(() => {
        this.vendingMachineModel.timerModel.addEvent();
        this.vendingMachineModel.resetVMModel();
      }, 5000);

      this.walletModel.addEvent(e);
      this.vendingMachineModel.addEventWallet(
        target.closest("li").querySelector(".count_index").textContent
      );
    });
  }

  render({ userWalletList, userWalletSum }) {
    const walletListHTML = userWalletList.reduce((html, item) => {
      return (html += `
          <li>
            <button value="${item.name}">${item.name}원</button>
            <span class="count_index">${item.count}</span>
          </li>
        `);
    }, "");

    const walletSumHTML = `<div class='wallet_sum'>${userWalletSum}</div>`;
    const walletRenderHTML = walletListHTML + walletSumHTML;

    this.element.querySelector(".wallet_list").innerHTML = walletRenderHTML;
  }

  init() {
    this.bindEvent();
  }
}

export default WalletView;
