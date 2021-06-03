class GoodsItem {
  constructor(src, title, price='Sold out', quantity='1') {
    this.src = src;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
  }

  render() {
    return `
    <div class="card" style="width: 18rem;">
      <img src="${this.src}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <div class="card-text">
            <div class="card__qauntity-price">
            <div class="card-count">
            <span class="count down">-</span>
              <input class="card-quantity" type="text" min="1" max="10" value="1" data-count="1" data-price="${this.price}">
            <span class="count up">+</span>
            </div>
              <p class="card-price">${this.price}$</p>
            </div>
            <div class="buttons">
              <a href="#" class="btn btn-primary">Buy</a>
              <a href="cart.html" class="btn btn-primary">Cart</a>
            </div>
          </div>
        </div>
    </div>`;
  }
}

// class CartItem extends GoodsItem {
//   render() {
//     return `<div class="cartCard" style="width: 6rem;"><img src="${this.src}" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">${this.title}</h5><div class="card-text"><p class="card-price">${this.price}</p></div>`;
//   }
// }

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [    
      { src: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fda%2Fd1%2Fdad12957d13623deed50acc1768069338435bbc7.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]', title: 'Shirt', price: '150'},
      { src: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fbd%2F61%2Fbd61be10417aea92d6b02d5dc7f13f6808293304.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_socks%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]', title: 'Socks', price: '50'},
      { src: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F09%2F43%2F09430a8883459320d80e12c9a4c060f58737dcf5.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]', title: 'Jacket', price: '350'},
      { src: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6c%2Fb7%2F6cb7144f28f62a93a6f4c4fc187daaeeb78cd29c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_shoes_boots%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]', title: 'Shoes'}
    ];
  }

  render() {
    let listHTML = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.src, good.title, good.price, good.quantity);
      listHTML += goodItem.render();
    })
    document.querySelector(".goods-list").innerHTML = listHTML;
  }

  getCount() {
    let input = document.querySelectorAll('.card-quantity');
    let sum = document.querySelectorAll('.card-price');
    console.log(input);
    for (let i=0; i<input.length; i++) {
      console.log(sum[i]);
      let count = parseInt(input[i].getAttribute('data-count'), 10);
      let price = parseInt(input[i].getAttribute('data-price'), 10);
      let tap = document.querySelectorAll('.count');
      tap.forEach((el) => {
        el.addEventListener('click', function(el) {
          let elem = el.target;
          if (elem.classList.contains('down')) {
            count = count == 1 ? count : (count - 1);
          } else if (elem.classList.contains('up')){
            count += 1;
          }
          input[i].value = count;
          sum[i].innerHTML = price * count+'$';
          input[i].setAttribute('data-count', count);
        })
      })
    }
  }
}
// class CartList extends GoodsList {
//   render() {
//     let listHTML = "";
//     this.goods.forEach((good) => {
//       const cartItem = new CartItem(good.src, good.title, good.price, good.quantity);
//       listHTML += cartItem.render();
//     })
//     document.querySelector(".cart-list").innerHTML = listHTML;
//   }
// }

const init = () => {
  const list = new GoodsList();
  list.fetchGoods();
  list.render();
  list.getCount();
  // const cart = new CartList();
  // cart.render();
};
  
window.onload = init;


