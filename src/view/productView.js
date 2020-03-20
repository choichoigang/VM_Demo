class ProductView {
  constructor(el, vendingModel) {
    this.element = el;
    this.vendingMachineModel = vendingModel;
    this.vendingMachineModel.subscribe(this.render.bind(this));
  }

  render({ productData, change }) {
    const productListEle = this.element.querySelector(".product_list");
    const productHTML = productData.reduce((html, item) => {
      return (html += `
        <li>
          <span class="product_index">${item.id}</span>
          <p class="product_name">${item.name}</p>
          <p class="product_price">${item.price}</p>
        </li>
      `);
    }, "");

    productListEle.innerHTML = productHTML;
    this.active(productListEle, productData, change);
  }

  active(productListEle, productData, change) {
    if (change) {
      productData.forEach((ele, idx) => {
        productListEle.children[idx].className = "";
      });
    } else {
      productData.forEach((ele, idx) => {
        if (ele.active) productListEle.children[idx].className = "active";
        else productListEle.children[idx].className = "";
      });
    }
  }
}

export default ProductView;
