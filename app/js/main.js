$(function () {
  // function searchBar() {
  //   $('#searchText').on('keyup', function () {
  //     let searchString = $(this).val();
  //     $("ul li ").each(function (index, value) {

  //       currentName = $(value).text()
  //       if (currentName.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
  //         $(value).show();
  //       } else {
  //         $(value).hide();
  //       }
  //     });
  //   });
  // };

  // searchBar();

  class SlideStories {
    constructor(id) {
      this.slide = document.querySelector(`[data-slide=${id}]`);
      this.active = 0;
      this.init();
    }

    activeSlide(index) {
      this.active = index;
      this.items.forEach((item) => {
        item.classList.remove("active");
      });
      this.items[index].classList.add("active");
      this.thumbItems.forEach((item) => {
        item.classList.remove("active");
      });
      this.thumbItems[index].classList.add("active");
      this.autoSlide();
      // console.log(this.thumbItems.classList);
    }

    prev() {
      if (this.active > 0) {
        this.activeSlide(this.active - 1);
      } else {
        this.activeSlide(this.items.length - 1);
      }
    }

    next() {
      if (this.active < this.items.length - 1) {
        this.activeSlide(this.active + 1);
      } else {
        this.activeSlide(0);
      }
    }

    addNavigation() {
      const nextBtn = this.slide.querySelector(".slide-next");
      const prevBtn = this.slide.querySelector(".slide-prev");
      nextBtn.addEventListener("click", this.next);
      prevBtn.addEventListener("click", this.prev);
    }

    addThumbItems() {
      this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
      this.thumbItems = Array.from(this.thumb.children);
    }

    autoSlide() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.next, 5000);
    }

    init() {
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
      this.items = this.slide.querySelectorAll(".slide-items > *");
      this.thumb = this.slide.querySelector(".slide-thumb");
      this.addThumbItems();
      this.activeSlide(0);
      this.addNavigation();
    }
  }

  new SlideStories("slide");



  // sort btn
  const sorter = btn => {
    const cards = [...document.querySelectorAll('.catalog')]
    const container = document.querySelector('.catalog__inner')
    let deck = []
    let btnDisabled = document.querySelector('.disabled')
    const filter = id => id.dataset.filter
    const type = id => id.dataset.type

    cards.forEach(el => {
      const from = id => el.querySelector(id).innerText
      let card = {val: from('.value'), name: from('h3'), card: el}
      deck.push(card)
      el.remove()
    })


    if (btnDisabled) {
      btnDisabled.classList.toggle('disabled')
      if (btn == btnDisabled)
        btnDisabled.dataset.type = type(btnDisabled) == 'вниз' ? 'верх' : 'вниз'
      btnDisabled.innerText = `Сорт. по ${filter(btnDisabled)}-${type(btnDisabled)}!`
    }
    btn.innerText = `Сорт. по ${filter(btn)}-${type(btn)}!`
    btn.classList.toggle('disabled')
    deck.sort((a, b) => {
      if (filter(btn) == 'имени')
        return type(btn) == 'верх' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      if (filter(btn) == 'цена')
        return type(btn) == "верх" ? a.val - b.val : b.val - a.val
    })
    deck.forEach(el => container.append(el.card))
  }

  document.querySelectorAll('.catalog-btn').forEach(btn =>
    btn.addEventListener('click', e => sorter(e.currentTarget)))

  //bascket
  $(document).ready(function () {
    (shoppingCart.countCart() > 0) ? cartWrapper.removeClass('empty') : null;
  });
  let cartWrapper = $('.cd-cart-container'),
    cartTrigger = cartWrapper.children('.cd-cart-trigger');
  cartTrigger.on('click', function (event) {
    event.preventDefault();
    var cartIsOpen = (typeof bool === 'undefined') ? cartWrapper.hasClass('cart-open') : bool;
    if (cartIsOpen) {cartWrapper.removeClass('cart-open');}
    else {
      cartWrapper.addClass('cart-open');
    }
  });
  cartWrapper.removeClass('cart-open');
  // ***************************************************
  // Shopping Cart functions
  // ***************************************************
  const shoppingCart = (function () {
    // Private methods and properties
    let cart = [];

    function Item(name, price, count, img) {
      this.name = name;
      this.price = price;
      this.count = count;
      this.img = img;
    }

    function saveCart() {
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
      cart = JSON.parse(localStorage.getItem("shoppingCart"));
      if (cart === null) {
        cart = []
      }
    }

    loadCart();

    // Public methods and properties
    var obj = {};

    obj.addItemToCart = function (name, price, count, img) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count += count;
          saveCart();
          return;
        }
      }

      var item = new Item(name, price, count, img);
      cart.push(item);
      saveCart();
    };

    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
      saveCart();
    };

    obj.removeItemFromCart = function (name) { // Removes one item
      for (var i in cart) {
        if (cart[i].name === name) { // "3" === 3 false
          cart[i].count--; // cart[i].count --
          if (cart[i].count === 0) {
            cart.splice(i, 1);
          }
          break;
        }
      }
      saveCart();
    };

    obj.removeItemFromCartAll = function (name) { // removes all item name
      for (var i in cart) {
        if (cart[i].name === name) {
          cart.splice(i, 1);
          break;
        }
      }
      saveCart();
    };

    obj.clearCart = function () {
      cart = [];
      saveCart();
    };

    obj.countCart = function () { // -> return total count
      var totalCount = 0;
      for (var i in cart) {
        totalCount += cart[i].count;
      }

      return totalCount;
    };

    obj.totalCart = function () { // -> return total cost
      var totalCost = 0;
      for (var i in cart) {
        totalCost += cart[i].price * cart[i].count;
      }
      return totalCost.toFixed(0);
    };

    obj.listCart = function () { // -> array of Items
      var cartCopy = [];
      for (var i in cart) {
        var item = cart[i];
        var itemCopy = {};
        for (var p in item) {
          itemCopy[p] = item[p];
        }
        itemCopy.total = (item.price * item.count).toFixed(0);
        cartCopy.push(itemCopy);
      }
      return cartCopy;
    };

    // ----------------------------
    return obj;
  })();
  $(".add-to-cart").click(function (event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));
    var img = $(this).attr("data-img");
    shoppingCart.addItemToCart(name, price, 1, img);
    displayCart();
    cartWrapper.removeClass('empty');
  });
  $("#clear-cart").click(function (event) {
    cartWrapper.removeClass('cart-open');
    cartWrapper.addClass('empty');
    shoppingCart.clearCart();
    displayCart();
  });
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output += `<li class='product'>
           <div class="product-image"><a href="#0"><img src="${cartArray[i].img}" alt="${cartArray[i].name}"></a></div>
           <div class='product-details'>
       	
            
                 <h3>${cartArray[i].name}</h3>
         	
              
 
             <div class='actions'>
               <div class="quantity">
               <label for="cd-product-3">Кол</label>
 
               <span class="select">
                 <select id="cd-product-3" name="quantity" class='item-count' data-name='${cartArray[i].name}' value=''>
                   <option value="">${cartArray[i].count}</option>
                   <option value="1">1</option>
                   <option value="2">2</option>
                   <option value="3">3</option>
                   <option value="4">4</option>
                   <option value="5">5</option>
                   <option value="6">6</option>
                   <option value="7">7</option>
                   <option value="8">8</option>
                   <option value="9">9</option>
                   <option value="10">10</option>
                   <option value="11">11</option>
                   <option value="12">12</option>
                   <option value="13">13</option>
                   <option value="14">14</option>
                   <option value="15">15</option>
                   <option value="16">16</option>
                   <option value="17">17</option>
                   <option value="18">18</option>
                   <option value="19">19</option>
                   <option value="20">20</option>
 
                 </select>
               </span>
               </div>
             </div>
          
               <span class='price'>${cartArray[i].total} ₽</span>
 
         	
           </div>
               <a class='delete-item' data-name='${cartArray[i].name}'><span>&#10540;</span></a>
           </li>`;
    }
    $("#show-cart").html(output);
    $("#count-cart").html(shoppingCart.countCart());
    $("#total-cart").html(shoppingCart.totalCart());
  }
  $("#show-cart").on("click", ".delete-item", function (event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
    if (shoppingCart.countCart() == 0) {
      cartWrapper.removeClass('cart-open');
      cartWrapper.addClass('empty');
    }
  });
  $("#show-cart").on("click", ".subtract-item", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCart(name);
    displayCart();
  });
  $("#show-cart").on("click", ".plus-item", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.addItemToCart(name, 0, 1);
    displayCart();
  });
  $("#show-cart").on("change", ".item-count", function (event) {
    var name = $(this).attr("data-name");
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  displayCart();


})

