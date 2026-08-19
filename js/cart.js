// V-Market Cart System

function getCart() {
  return JSON.parse(localStorage.getItem("vmarket_cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("vmarket_cart", JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);

  if (!product) {
    alert("Product not found!");
    return;
  }

  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart(cart);
  updateCartCount();

  alert("Product added to cart 🛒");
}

function removeFromCart(productId) {
  let cart = getCart();

  cart = cart.filter(item => item.id !== Number(productId));

  saveCart(cart);
  updateCartCount();

  if (typeof renderCart === "function") {
    renderCart();
  }
}

function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === Number(productId));

  if (!item) return;

  quantity = Number(quantity);

  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  item.quantity = quantity;

  saveCart(cart);
  updateCartCount();

  if (typeof renderCart === "function") {
    renderCart();
  }
}

function getCartTotal() {
  const cart = getCart();

  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function getCartItemsCount() {
  const cart = getCart();

  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}

function updateCartCount() {
  const count = getCartItemsCount();

  const cartCounters = document.querySelectorAll(
    "#cart-count, .cart-count"
  );

  cartCounters.forEach(counter => {
    counter.textContent = count;
  });
}

function clearCart() {
  localStorage.removeItem("vmarket_cart");
  updateCartCount();

  if (typeof renderCart === "function") {
    renderCart();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
