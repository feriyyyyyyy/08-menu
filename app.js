// Daftar menu yang sudah ada
const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed.",
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: "Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing.",
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: "Ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.",
  },
  // Daftar item lainnya ...
];

let cart = [];

// Mendapatkan elemen parent
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

// Menampilkan menu saat halaman dimuat
window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);
  displayMenuButtons();
});

// Menampilkan menu items
function displayMenuItems(menuItems) {
  let displayMenu = menuItems
    .map(function (item) {
      return `<article class="menu-item">
      <img src="${item.img}" alt="${item.title}" class="photo" />
      <div class="item-info">
        <header>
          <h4>${item.title}</h4>
          <h4 class="price">$${item.price}</h4>
        </header>
        <p class="item-text">${item.desc}</p>
        <div class="item-controls">
          <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
          <span class="quantity" id="quantity-${item.id}">0</span>
          <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
          <button class="btn buy-btn" data-id="${item.id}">Beli</button>
        </div>
      </div>
    </article>`;
    })
    .join("");

  sectionCenter.innerHTML = displayMenu;

  // Menambahkan event listener untuk tombol tambah, kurang, dan beli
  document.querySelectorAll(".quantity-btn").forEach((button) => {
    button.addEventListener("click", handleQuantityChange);
  });

  document.querySelectorAll(".buy-btn").forEach((button) => {
    button.addEventListener("click", handleBuyButtonClick);
  });
}

// Menampilkan tombol kategori menu
function displayMenuButtons() {
  const categories = menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );

  const categoryBtns = categories
    .map(function (category) {
      return `<button type="button" class="filter-btn" data-id="${category}">${category}</button>`;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;

  // Menambahkan event listener untuk filter kategori
  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const filteredItems =
        category === "all"
          ? menu
          : menu.filter((item) => item.category === category);
      displayMenuItems(filteredItems);
    });
  });
}

// Menangani perubahan jumlah (tambah atau kurang)
function handleQuantityChange(e) {
  const action = e.currentTarget.dataset.action;
  const itemId = e.currentTarget.dataset.id;
  const quantityElement = document.getElementById(`quantity-${itemId}`);
  let quantity = parseInt(quantityElement.textContent);

  if (action === "increase") {
    quantity++;
  } else if (action === "decrease" && quantity > 0) {
    quantity--;
  }

  quantityElement.textContent = quantity;
}
// Menangani klik tombol "Beli"
function handleBuyButtonClick(e) {
  const itemId = e.currentTarget.dataset.id;
  const quantity = parseInt(
    document.getElementById(`quantity-${itemId}`).textContent
  );

  if (quantity > 0) {
    // Menambahkan item ke keranjang
    const item = menu.find((item) => item.id === parseInt(itemId));
    const cartItem = { ...item, quantity };
    cart.push(cartItem);

    // Menyimpan data keranjang ke localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect ke halaman pembayaran
    window.location.href = "./payment.html";
  } else {
    alert("Jumlah item harus lebih dari 0 untuk membeli.");
  }
}
