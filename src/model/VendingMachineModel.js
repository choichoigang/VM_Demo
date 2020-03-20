import Observable from "./observable.js";

class VendingMachineModel extends Observable {
  constructor(timerModel) {
    super();

    this.timerModel = timerModel;

    this.state = {
      productData: null,
      accumulatedAmount: 0,
      targetValue: null,
      productNumber: "",
      productName: "",
      type: "",
      change: false
    };
  }

  async initFetch(url) {
    const res = await fetch(url);
    const jsonData = await res.json();

    this.state.productData = jsonData.productList;
    await this.notify(this.state);
  }

  resetVMModel() {
    this.state.accumulatedAmount = 0;
    this.state.type = "timer";
    this.state.change = true;
    this.notify(this.state);
    this.state.change = false;
  }

  addEventWallet(targetCountNumber) {
    const target = event.target;
    const targetCount = Number(targetCountNumber);
    if (!targetCount) return;
    this.state.targetValue = target.value;
    this.state.accumulatedAmount += Number(target.value);
    this.state.type = "wallet";
    this.filterActiveProduct(this.state.productData);
    this.notify(this.state);
  }

  addEventDial(dial, type) {
    switch (type) {
      case "number":
        clearTimeout(this.timerModel.state.timer);
        this.state.productNumber += dial;
        break;
      case "select":
        this.clickSelectDial(this.state.productNumber);
        if (this.state.accumulatedAmount === 0) {
          alert(`누적된 금액이 0원 입니다. 금액을 투입해 주세요`);
          return;
        }

        this.timerModel.state.accumulatedAmount = this.state.accumulatedAmount;
        this.timerModel.state.timer = setTimeout(() => {
          this.timerModel.addEvent();
          this.resetVMModel();
        }, 5000);

        break;
      case "cancel":
        this.state.productNumber = "";
        break;
    }
  }

  clickSelectDial(number) {
    const productId = Number(number);
    if (!productId || productId > this.state.productData.length)
      return (this.state.productNumber = "");
    this.state.type = "dial";
    const filteringProduct = this.filterIdProduct(productId);

    if (this.state.accumulatedAmount < Number(filteringProduct.price)) {
      this.state.productNumber = "";
      this.state.type = "err";
      return this.notify(this.state);
    }

    this.state.productName = filteringProduct.name;
    this.state.accumulatedAmount -= Number(filteringProduct.price);
    this.filterActiveProduct(this.state.productData);
    this.notify(this.state);

    this.state.productNumber = "";
  }

  filterIdProduct(id) {
    const filteringProduct = this.state.productData.filter(
      product => product.id === id
    )[0];

    return { name: filteringProduct.name, price: filteringProduct.price };
  }

  filterActiveProduct(productList) {
    productList.forEach((product, idx) => {
      if (product.price <= this.state.accumulatedAmount)
        this.state.productData[idx].active = true;
      else this.state.productData[idx].active = false;
    });
  }
}

export default VendingMachineModel;
