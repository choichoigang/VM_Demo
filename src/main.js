import ProductView from "./view/productView.js";
import SelectView from "./view/selectView.js";
import WalletView from "./view/walletView.js";

import VendingMachineModel from "./model/VendingMachineModel.js";
import WalletModel from "./model/walletModel.js";
import TimerModel from "./model/timerModel.js";

import VM from "./constant/vmConstant.js";

const _ = {
  productEle: document.querySelector(".product_screen"),
  selectEle: document.querySelector(".choice_screen"),
  walletEle: document.querySelector(".customer_wallet")
};

const walletModel = new WalletModel();
const timerModel = new TimerModel(walletModel);
const vendingMachineModel = new VendingMachineModel(timerModel);

const productView = new ProductView(_.productEle, vendingMachineModel);
const selectView = new SelectView(_.selectEle, vendingMachineModel);
const walletView = new WalletView(
  _.walletEle,
  walletModel,
  vendingMachineModel
);

walletModel.initFetch("./data/vmData.json");
vendingMachineModel.initFetch("./data/vmData.json");
