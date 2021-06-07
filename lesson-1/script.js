const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
  constructor(id, product_name, price) {
    this.id = id;
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    return `
    <div id=${this.id} class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${this.product_name}</h5>
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
            <a href="#" class="btn btn-primary buy">Buy</a>
            <a href="#" class="btn btn-primary remove">Cart</a>
          </div>
        </div>
      </div>
    </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  async fetchGoods() {
    const response = await fetch(`${API_URL}/catalogData.json`);
    const catalogItems = await response.json();
    this.goods = catalogItems;
    console.log(catalogItems);
  }

  render() {
    let listHTML = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
      listHTML += goodItem.render();

    })
    document.querySelector(".goods-list").innerHTML = listHTML;
  }

  getCount() {
    let input = document.querySelectorAll('.card-quantity');
    let sum = document.querySelectorAll('.card-price');
    for (let i=0; i<input.length; i++) {
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

class CartItem {
  constructor(id, product_name, price) {
    this.id = id;
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    return `
    <div id=${this.id} class="cartCard" style="width: 6rem;">
      <div class="card-body">
        <h5 class="card-title">${this.product_name}</h5>
        <div class="card-text">
          <p class="card-price">${this.price}</p>
        </div>
        <button class="btn btn-primery remove">Удалить из Корзины</button>
      </div>
    </div>`;
  }
}

class CartList {
  constructor() {
    this.cartItems = [];
  }

  getCartItem() {  //добавление в корзину
    let cartList = document.querySelector(".cart-list");
    let cards = document.querySelectorAll(".card");
    cards.forEach((item) => {
      let card = document.getElementById(item.id);
      let button = card.querySelector('.buy');
      button.addEventListener('click', function() {
        let cartCard = card.cloneNode(true);
        cartList.appendChild(cartCard);
        console.log(cartList); //выводит "корзину"
      })
    })
  }

  removeCartItem() { //удаление из корзины
    let cartList = document.querySelector(".cart-list");
    let cards = cartList.querySelectorAll(".card");
    console.log(cards);
    cards.forEach((item) => {
      let card = document.getElementById(item.id);
      console.log(card);
      let remove = card.querySelector(".remove");
      remove.addEventListener('click', function() {
        console.log(cards);
        console.log(card);
        setTimeout(() => card.remove(), 500);
        console.log(cartList);
      })
    })
  }

  render() {
    let listHTML = "";
    this.cartItems.forEach((item) => {
      const cartItem = new CartItem(item.id_product, item.product_name, item.price);
      listHTML += cartItem.render();
    })
    document.querySelector(".cart-list").innerHTML = listHTML;
  }
}

const init = async () => {
  const list = new GoodsList();
  await list.fetchGoods();
  list.render();
  list.getCount();

  const cart = new CartList();
  cart.getCartItem();
  cart.removeCartItem();
};

window.onload = init;

