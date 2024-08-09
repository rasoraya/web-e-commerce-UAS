$(document).ready(()=> {
    $('.menuOpen').click(()=> {
        $('.menu').addClass('active')
    })

    $('.menuClose').click(()=> {
        $('.menu').removeClass('active')
    })

    $(document).scroll(() => {
        $('.navbar').toggleClass('active', $(this).scrollTop() > $('.navbar').height)
    })

})


// ----------------BOOLEAN---------------

var swiper = new Swiper(".mySwiperHome", {
    slidesPerView: "auto",
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
    },
    autoplay: {
        delay : 2000
    }

  });

  var swiper = new Swiper(".mySwiperProduct", {
    slidesPerView: "auto",
    spaceBetween: 30,
    navigation: {
      nextEl: ".bxs-chevron-right-square",
      prevEl: ".bxs-chevron-left-square",
    },
  });

  var swiper = new Swiper(".mySwiperProduct2", {
    slidesPerView: "auto",
    spaceBetween: 30,
    navigation: {
      nextEl: ".bxs-chevron-right-square",
      prevEl: ".bxs-chevron-left-square",
    },
  });

  var swiper = new Swiper(".mySwiperProduct3", {
    slidesPerView: "auto",
    spaceBetween: 30,
    navigation: {
      nextEl: ".bxs-chevron-right-square",
      prevEl: ".bxs-chevron-left-square",
    },
  });

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// -------------IF ELSE-------------

if(document.readyState == "loading"){
  document.addEventListener('DOMContentLoaded', start);
}else{
  start();
} 

function start(){
  addEvents();
}

function update(){
  addEvents();
  updateTotal();
}

// --------------EVENTS--------------

function addEvents(){

  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  })

  let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
  cartQuantity_inputs.forEach(input => {
    input.addEventListener("change", handle_changeItemQuantity);
  })

  let addCart_btns = document.querySelectorAll(".btn-card");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

let itemsAdded = []



function handle_addCartItem(){
  let product = this.parentElement;
  let title = product.querySelector(".product-name").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  // -------------object------------

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  if(itemsAdded.find(el => el.title == newToAdd.title)) {
    alert("barang sudah masuk ke keranjang anda");
    return;
  }else{
    itemsAdded.push(newToAdd);
  }


  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem(){
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    el => 
      el.title != 
      this.parentElement.querySelector('.cart-product-title').innerHTML
  );

  update();
}

function handle_changeItemQuantity(){
  if(isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);

  update();
}

function handle_buyOrder() {
  if(itemsAdded.length <= 0){
    alert("keranjang kosong :( ");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("pesanan anda berhasil diproses :)" );
  itemsAdded = [];

  update();
}

// ---------------ARITMATIKA--------------

function updateTotal(){
  let cartBoxes = document.querySelectorAll('.cart-box');
  const totalElement = cart.querySelector('.total-price');
  let total = 0;
  cartBoxes.forEach(cartBox => {
    let priceElement = cartBox.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("Rp.", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  })

  total = total.toFixed(2);
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "Rp." + total;
}

// -------------DOM-------------

function CartBoxComponent(title, price, imgSrc){
  return `
  <div class="cart-box">
  <img src=${imgSrc} alt="" cart="cart-img" height="70px" weight="70px">
  <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
  </div>
  <i class='bx bxs-trash-alt cart-remove'></i>
</div>`;
}
                        

