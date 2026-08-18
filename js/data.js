// Sample Product Data
const PRODUCTS = [
    // Electronics
    { id: 1, name: 'Wireless Bluetooth Earbuds', category: 'electronics', price: 999, selling: 799, emoji: '🎧', rating: 4.5, reviews: 1250, discount: 20 },
    { id: 2, name: 'Smart Fitness Watch', category: 'electronics', price: 1599, selling: 1199, emoji: '⌚', rating: 4.2, reviews: 856, discount: 25 },
    { id: 3, name: 'USB-C Fast Charger', category: 'electronics', price: 799, selling: 599, emoji: '🔌', rating: 4.4, reviews: 542, discount: 25 },
    { id: 4, name: 'Portable Power Bank', category: 'electronics', price: 1999, selling: 1499, emoji: '🔋', rating: 4.3, reviews: 765, discount: 25 },

    // Fashion
    { id: 5, name: 'Premium Men\'s T-Shirt', category: 'fashion', price: 599, selling: 399, emoji: '👕', rating: 4.6, reviews: 2103, discount: 30 },
    { id: 6, name: 'Cotton Casual Shirt', category: 'fashion', price: 1299, selling: 899, emoji: '👔', rating: 4.5, reviews: 1876, discount: 30 },
    { id: 7, name: 'Denim Jeans', category: 'fashion', price: 1899, selling: 1299, emoji: '👖', rating: 4.4, reviews: 1543, discount: 32 },
    { id: 8, name: 'Winter Jacket', category: 'fashion', price: 2499, selling: 1899, emoji: '🧥', rating: 4.7, reviews: 987, discount: 24 },

    // Home
    { id: 9, name: 'Kitchen Essentials Set', category: 'home', price: 699, selling: 599, emoji: '🍳', rating: 4.1, reviews: 723, discount: 15 },
    { id: 10, name: 'Bed Sheet Set', category: 'home', price: 1499, selling: 999, emoji: '🛏️', rating: 4.5, reviews: 1234, discount: 33 },
    { id: 11, name: 'Table Lamp', category: 'home', price: 899, selling: 699, emoji: '🔦', rating: 4.3, reviews: 567, discount: 22 },
    { id: 12, name: 'Door Mat', category: 'home', price: 299, selling: 199, emoji: '🚪', rating: 4.2, reviews: 432, discount: 33 },

    // Beauty
    { id: 13, name: 'Daily Beauty Care Kit', category: 'beauty', price: 609, selling: 499, emoji: '💄', rating: 4.4, reviews: 892, discount: 18 },
    { id: 14, name: 'Face Wash Combo', category: 'beauty', price: 799, selling: 599, emoji: '🧴', rating: 4.6, reviews: 1156, discount: 25 },
    { id: 15, name: 'Hair Oil Pack', category: 'beauty', price: 549, selling: 399, emoji: '🧴', rating: 4.3, reviews: 743, discount: 27 },
    { id: 16, name: 'Sunscreen SPF 50', category: 'beauty', price: 399, selling: 299, emoji: '☀️', rating: 4.5, reviews: 654, discount: 25 },

    // Grocery
    { id: 17, name: 'Premium Grocery Pack', category: 'grocery', price: 779, selling: 699, emoji: '🥫', rating: 4.5, reviews: 1876, discount: 10 },
    { id: 18, name: 'Organic Rice Bag', category: 'grocery', price: 549, selling: 449, emoji: '🍚', rating: 4.4, reviews: 892, discount: 18 },
    { id: 19, name: 'Spice Combo Pack', category: 'grocery', price: 699, selling: 599, emoji: '🧂', rating: 4.6, reviews: 567, discount: 14 },
    { id: 20, name: 'Flour Bag (5kg)', category: 'grocery', price: 399, selling: 299, emoji: '🌾', rating: 4.5, reviews: 743, discount: 25 },

    // Sports
    { id: 21, name: 'Premium Football', category: 'sports', price: 625, selling: 549, emoji: '⚽', rating: 4.3, reviews: 456, discount: 12 },
    { id: 22, name: 'Yoga Mat', category: 'sports', price: 799, selling: 599, emoji: '🧘', rating: 4.5, reviews: 834, discount: 25 },
    { id: 23, name: 'Dumbbells Set', category: 'sports', price: 1999, selling: 1499, emoji: '🏋️', rating: 4.6, reviews: 1023, discount: 25 },
    { id: 24, name: 'Sports Shoes', category: 'sports', price: 2499, selling: 1999, emoji: '👟', rating: 4.4, reviews: 1567, discount: 20 },
];

const CATEGORIES = ['fashion', 'electronics', 'home', 'beauty', 'grocery', 'sports', 'more'];

// Cart Management
class Cart {
    constructor() {
        this.items = this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            return JSON.parse(localStorage.getItem('vmarket_cart')) || [];
        } catch {
            return [];
        }
    }

    saveToStorage() {
        localStorage.setItem('vmarket_cart', JSON.stringify(this.items));
    }

    add(product, quantity = 1) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }
        this.saveToStorage();
        return this.items.length;
    }

    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
    }

    update(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.remove(productId);
            } else {
                item.quantity = quantity;
            }
            this.saveToStorage();
        }
    }

    clear() {
        this.items = [];
        this.saveToStorage();
    }

    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.selling * item.quantity), 0);
    }

    getSubtotal() {
        return this.getTotal();
    }
}

// Wishlist Management
class Wishlist {
    constructor() {
        this.items = this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            return JSON.parse(localStorage.getItem('vmarket_wishlist')) || [];
        } catch {
            return [];
        }
    }

    saveToStorage() {
        localStorage.setItem('vmarket_wishlist', JSON.stringify(this.items));
    }

    add(product) {
        if (!this.items.find(item => item.id === product.id)) {
            this.items.push(product);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
    }

    has(productId) {
        return this.items.some(item => item.id === productId);
    }

    toggle(product) {
        if (this.has(product.id)) {
            this.remove(product.id);
            return false;
        } else {
            this.add(product);
            return true;
        }
    }

    clear() {
        this.items = [];
        this.saveToStorage();
    }
}

// Orders Management
class Orders {
    constructor() {
        this.orders = this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            return JSON.parse(localStorage.getItem('vmarket_orders')) || [];
        } catch {
            return [];
        }
    }

    saveToStorage() {
        localStorage.setItem('vmarket_orders', JSON.stringify(this.orders));
    }

    create(orderData) {
        const order = {
            id: 'ORD' + Date.now(),
            ...orderData,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            items: orderData.items || [],
            total: orderData.total || 0
        };
        this.orders.push(order);
        this.saveToStorage();
        return order;
    }

    getAll() {
        return this.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    getById(id) {
        return this.orders.find(order => order.id === id);
    }

    update(id, updates) {
        const order = this.getById(id);
        if (order) {
            Object.assign(order, updates);
            this.saveToStorage();
        }
    }
}

// Initialize global instances
const cart = new Cart();
const wishlist = new Wishlist();
const orders = new Orders();

// Utility Functions
function getProduct(id) {
    return PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(category) {
    if (category === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
}

function searchProducts(query) {
    const lower = query.toLowerCase();
    return PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(lower) || 
        p.category.toLowerCase().includes(lower)
    );
}

function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

function formatCurrency(value) {
    return value.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    });
}
