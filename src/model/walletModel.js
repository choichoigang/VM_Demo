import Observable from "./observable.js";

class WalletModel extends Observable {
  constructor() {
    super();
    this.walletData = {
      userWalletList: null,
      userWalletSum: 0
    };
  }

  async initFetch(url) {
    const res = await fetch(url);
    const jsonData = await res.json();

    this.walletData.userWalletList = jsonData.walletList;

    await this.beginningSum();
    await this.notify(this.walletData);
  }

  addEvent(event) {
    const clickedTarget = Number(event.target.value);

    this.decreaseWalletData(clickedTarget);
    this.notify(this.walletData);
  }

  decreaseWalletData(clickedTarget) {
    this.walletData.userWalletList.forEach(el => {
      if (el.name === clickedTarget) {
        if (el.count === 0) {
          return;
        }
        this.calculateSum(clickedTarget);
        el.count--;
      }
    });
  }

  calculateSum(clickedTarget) {
    this.walletData.userWalletSum -= clickedTarget;
  }

  beginningSum() {
    const walletList = this.walletData.userWalletList;

    walletList.forEach(el => {
      this.walletData.userWalletSum += el.name * el.count;
    });
  }
}

export default WalletModel;
