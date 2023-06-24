const fs = require('fs');
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename), 
  'data', 
  'cart.json'
  );

module.exports = class Cart {
  // 장바구니는 상품을 담을 때마다 새로 추가하는 객체가 아니기 때문에 constructor 대신 static 메서드 사용
  static addProduct(id, productPrice){
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};
      if (!err)  {
        cart = JSON.parse(fileContent);        
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct;
      // Add nwe product / increase quantity
      if (existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = { id: id, qty: 1 }; 
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      })
    })
  }


}