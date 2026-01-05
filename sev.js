function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function addToCart(btn) {
    let card = btn.closest('.card');
    let productId = btn.getAttribute('data-id');

    let productData = {
        id: productId,
        name: card.querySelector('h3').innerText,
        image: card.querySelector('img').src,
        price: card.querySelector('.text-lg').innerText,
        monthlyPrice: card.querySelector('.line-through') ? card.querySelector('.line-through').innerText : "",
        imageLabel: card.querySelector('.font-semibold') ? card.querySelector('.font-semibold').innerText : "",
        html: card.innerHTML
    };

    let cart = getCart();

    if (!cart.some(p => p.id === productId)) {
        cart.push(productData);
        saveCart(cart);
        console.log("Card added to cart:", productData);
        renderCart(); 
    } else {
        console.log("Card already in cart:", productData);
    }
}


function renderCart() {
    let data = getCart();
    let wrapper = document.querySelector('.');
    wrapper.innerHTML = "";

    data.forEach((sev) => {
        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = sev.html; 
        wrapper.appendChild(div);
    });
}


async function fetchData() {
    try {
        let response = await fetch('https://dummyjson.com/products/category');
        let data = await response.json();
        console.log(data);

        let wrapper = document.querySelector('.wrapper');
        wrapper.innerHTML = "";

        data.forEach((product) => {
            let div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <div class="bg-white rounded-2xl shadow-lg w-[260px] overflow-hidden">
                    <div class="relative p-4">
                        <img src="${product.image}" />
                    </div>
                    <div class="p-4">
                        <h3 class="text-sm font-semibold leading-snug">${product.name}</h3>
                        <div class="mt-2">
                            <span class="text-lg font-bold text-purple-600">${product.price}</span>
                            <span class="text-sm text-gray-400 line-through ml-2">${product.monthlyPrice}</span>
                        </div>
                        <div class="mt-1 text-sm text-gray-600">
                            <span class="font-semibold text-yellow-600">${product.imageLabel}</span>
                        </div>
                        <button onclick="addToCart(this)" 
                                class="add-to-cart mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-sm font-medium transition"
                                data-id="${product.id}">
                            Ertaga
                        </button>
                    </div>
                </div>
            `;
            wrapper.appendChild(div);
        });

    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    renderCart(); 
});
