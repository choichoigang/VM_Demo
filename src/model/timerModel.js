class TimerModel {
  constructor(walletModel) {
    this.walletModel = walletModel;

    this.state = {
      timer: null,
      accumulatedAmount: 0
    };

    this.walletValueList = [10000, 5000, 1000, 100, 50, 10];
  }
  addEvent() {
    const walletList = this.walletModel.walletData.userWalletList.reverse();

    walletList.forEach((el, index) => {
      const addCount = parseInt(
        this.state.accumulatedAmount / this.walletValueList[index]
      );
      if (addCount === 0 || this.state.accumulatedAmount === 0) {
        return;
      } else {
        el.count += addCount;
        this.state.accumulatedAmount =
          this.state.accumulatedAmount % this.walletValueList[index];
      }
    });

    walletList.reverse();

    this.walletModel.walletData.userWalletSum = 0;
    this.walletModel.beginningSum();
    this.walletModel.notify(this.walletModel.walletData);

    return 0;
  }

  AccumulatedSum(targetValue) {
    this.state.accumulatedAmount += Number(targetValue);
  }
}

export default TimerModel;
