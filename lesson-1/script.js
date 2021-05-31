const goods = [
    {src: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fda%2Fd1%2Fdad12957d13623deed50acc1768069338435bbc7.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]', title: 'Shirt', price: '150$'},
    {src: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fbd%2F61%2Fbd61be10417aea92d6b02d5dc7f13f6808293304.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_socks%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]', title: 'Socks', price: '50$'},
    {src: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F09%2F43%2F09430a8883459320d80e12c9a4c060f58737dcf5.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]', title: 'Jacket', price: '350$'},
    {title: 'Cap'},
    {src: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6c%2Fb7%2F6cb7144f28f62a93a6f4c4fc187daaeeb78cd29c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_shoes_boots%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]', title: 'Shoes'}
];

const renderGoodsItem = (src="https://directsalez.ru/wp-content/uploads/2020/07/723b19d0b9b419c81db0a3443869161f.jpg", title, price="Sold out", quantity="1") => {
    return `<div class="card" style="width: 18rem;">
    <img src="${src}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <div class="card-text">
      <input class="card-quantity" type="number" min="1" max="10" value=${quantity}>
      <p class="card-price">${price}</p>
      </div>
      <div class="buttons">
      <a href="#" class="btn btn-primary">Buy</a>
      <a href="#" class="btn btn-primary">Card</a>
      </div>
    </div>
  </div>`;
}

const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.src, item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join(''); //убрала разделители в массиве
}

const init = () => {
    renderGoodsList(goods);
  }
  
  window.onload = init;

