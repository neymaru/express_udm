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

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;  // 장바구니를 찾지 못했으면 그냥 종료
      }
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id === id)
      if (!product) return; // 장바구니에 없으면 return으로 마무리
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      })
    })
  }

  // 장바구니에 있는 모든 제품 받기
  static getCart(cb) {  // 제품 정보를 받은 후에 호출하는 콜백이 있어야 함
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) cb(null) // 장바구니가 없어서 실패하면 null 호출
      else cb(cart)  // 콜백에서 장바구니 전체 반환

    })
  }
}