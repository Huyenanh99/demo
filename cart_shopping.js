let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

// Toggle hiển thị giỏ hàng
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Dữ liệu sản phẩm
let listProducts = [
    { "id": 1, "name": "OUTFIT1", "price": 200, "image": "./img/1.png" },
    { "id": 2, "name": "OUTFIT2", "price": 300, "image": "./img/2.png" },
    { "id": 3, "name": "OUTFIT3", "price": 500, "image": "./img/3.png" },
    { "id": 4, "name": "OUTFIT4", "price": 200, "image": "./img/4.png" },
    { "id": 5, "name": "OUTFIT5", "price": 400, "image": "./img/5.png" },
    { "id": 6, "name": "OUTFIT6", "price": 250, "image": "./img/6.png" },
    { "id": 7, "name": "OUTFIT7", "price": 600, "image": "./img/7.png" },
    { "id": 8, "name": "OUTFIT8", "price": 350, "image": "./img/8.png" }
];

let cart = [];

// Hiển thị danh sách sản phẩm ra HTML
const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
};

// Xử lý khi click "Add To Cart"
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

// Thêm sản phẩm vào giỏ hàng
const addToCart = (product_id) => {
    let product = listProducts.find(p => p.id == product_id);
    let positionThisProductInCart = cart.findIndex(item => item.product_id == product_id);

    if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.image
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }

    addCartToHTML();
    updateCartCount();
};

// Cập nhật giỏ hàng ra HTML
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalAmount = 0; // Biến để lưu tổng số tiền

    if (cart.length > 0) {
        cart.forEach(item => {
            let newCartItem = document.createElement('div');
            newCartItem.classList.add('item');
            newCartItem.dataset.id = item.product_id;
            newCartItem.innerHTML = `
                <div class="img">
                    <img src="${item.image}" alt="">
                </div>
                <div class="name">${item.name}</div>
                <div class="totalPrice">$${item.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
            listCartHTML.appendChild(newCartItem);

            // Cộng dồn số tiền vào tổng
            totalAmount += item.price * item.quantity;
        });
    }

    // Cập nhật tổng số tiền
    document.getElementById('totalPrice').textContent = `$${totalAmount}`;

    // Thêm event listener cho các nút tăng/giảm số lượng
    document.querySelectorAll('.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let product_id = e.target.closest('.item').dataset.id;
            updateQuantity(product_id, 'decrease');
        });
    });

    document.querySelectorAll('.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let product_id = e.target.closest('.item').dataset.id;
            updateQuantity(product_id, 'increase');
        });
    });
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateQuantity = (product_id, action) => {
    let positionThisProductInCart = cart.findIndex(item => item.product_id == product_id);

    if (positionThisProductInCart >= 0) {
        if (action === 'increase') {
            cart[positionThisProductInCart].quantity += 1;
        } else if (action === 'decrease') {
            if (cart[positionThisProductInCart].quantity > 1) {
                cart[positionThisProductInCart].quantity -= 1;
            } else {
                // Xóa sản phẩm nếu số lượng bằng 0
                cart.splice(positionThisProductInCart, 1);
            }
        }
    }

    addCartToHTML();
    updateCartCount();
};

// Cập nhật số lượng sản phẩm hiển thị trên icon giỏ hàng
const updateCartCount = () => {
    let totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    iconCartSpan.textContent = totalItems;
};

// Khởi tạo dữ liệu sản phẩm khi trang được tải
addDataToHTML();
