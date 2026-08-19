const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    price: 499,
    oldPrice: 899,
    rating: 4.4,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    stock: 25,
    resell: true
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds",
    category: "Electronics",
    price: 799,
    oldPrice: 1499,
    rating: 4.3,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600",
    stock: 18,
    resell: true
  },
  {
    id: 3,
    name: "Smart LED Bulb",
    category: "Electronics",
    price: 299,
    oldPrice: 599,
    rating: 4.2,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600",
    stock: 40,
    resell: true
  },
  {
    id: 4,
    name: "Stylish Backpack",
    category: "Fashion",
    price: 699,
    oldPrice: 1199,
    rating: 4.5,
    reviews: 184,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    stock: 20,
    resell: true
  },
  {
    id: 5,
    name: "Non-Stick Kitchen Pan",
    category: "Home",
    price: 899,
    oldPrice: 1599,
    rating: 4.4,
    reviews: 75,
    image: "https://images.unsplash.com/photo-1584990347449-ae9c6c8e9e55?w=600",
    stock: 15,
    resell: true
  },
  {
    id: 6,
    name: "Face Care Beauty Kit",
    category: "Beauty",
    price: 599,
    oldPrice: 999,
    rating: 4.1,
    reviews: 63,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600",
    stock: 30,
    resell: true
  },
  {
    id: 7,
    name: "Fresh Grocery Combo",
    category: "Grocery",
    price: 399,
    oldPrice: 499,
    rating: 4.6,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600",
    stock: 50,
    resell: false
  },
  {
    id: 8,
    name: "Burger Combo",
    category: "Food",
    price: 249,
    oldPrice: 349,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    stock: 20,
    resell: false
  }
];

function getProductById(id) {
  return products.find(product => product.id === Number(id));
}

function getProductsByCategory(category) {
  if (!category || category === "All") {
    return products;
  }

  return products.filter(
    product => product.category.toLowerCase() === category.toLowerCase()
  );
}

function searchProducts(query) {
  const search = query.toLowerCase().trim();

  if (!search) {
    return products;
  }

  return products.filter(product =>
    product.name.toLowerCase().includes(search) ||
    product.category.toLowerCase().includes(search)
  );
}
