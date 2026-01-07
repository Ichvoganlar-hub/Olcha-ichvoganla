function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  snowflake.textContent = "❄️";

  snowflake.style.left = Math.random() * window.innerWidth + "px";
  snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
  snowflake.style.opacity = Math.random();
  snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";

  document.body.appendChild(snowflake);
  setTimeout(() => snowflake.remove(), 10000);
}
setInterval(createSnowflake, 200);

const phonesEl = document.getElementById("phones");
const laptopsEl = document.getElementById("laptops");
const groceriesEl = document.getElementById("groceries");
const beautyEl = document.getElementById("beauty");
const furnitureEl = document.getElementById("furniture");

const reklama1 = document.getElementById("reklama1");
const reklama2 = document.getElementById("reklama2");
const reklama3 = document.getElementById("reklama3");
const reklama4 = document.getElementById("reklama4");

async function fetchCategory(category, limit = null) {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data = await res.json();
    return limit ? data.products.slice(0, limit) : data.products;
  } catch (e) {
    console.error(e);
    return [];
  }
}


function renderCards(wrapper, products) {
  wrapper.innerHTML = "";

  products.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="p-2 bg-white rounded-xl shadow-md flex flex-col gap-3 relative">
        <button class="heart-btn absolute top-3 right-3 w-[32px] h-[32px] rounded-full flex items-center justify-center">
          <svg class="heart-icon" viewBox="0 0 24 24">
            <path d="M12 6C10.2 3.9 7.2 3.3 4.9 5.2C2.6 7.1 2.3 10.3 4.1 12.6C5.6 14.5 10.1 18.4 11.5 19.7C11.9 20 12.1 20 12.5 19.7C13.9 18.4 18.4 14.5 19.9 12.6C21.6 10.3 21.3 7.1 19 5.2C16.8 3.3 13.8 3.9 12 6Z"
              stroke="currentColor" stroke-width="1.2" fill="none"/>
          </svg>
        </button>

        <img src="${item.thumbnail}" class="w-full h-[220px] object-contain">
        <p class="font-semibold text-sm">${item.title}</p> 
        <p class="font-bold text-sm bg-yellow-400 w-[100px] text-center text-black  rounded-md">${item.price.toLocaleString()} so'm</p>

        <div class="flex justify-start items-center gap-2">
        <button class="border border-black rounded-md p-2 bg-white text-black hover:bg-black hover:text-white hover:border-white transition duration-300 active:scale-95">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <circle cx="10.07" cy="20.59" r="1.91" />
          <circle cx="18.66" cy="20.59" r="1.91" />
          <path d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10"/>
          <polyline points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91"/>
        </svg>
      </button>
        <button class="add-to-cart-btn border flex-1  border-red-600 text-red-600 font-medium py-2 rounded-md hover:bg-red-600 hover:text-white transition"
          data-item='${JSON.stringify(item)}'>
          Korzinkaga
        </button>
        </div>
      </div>
    `;

    wrapper.appendChild(card);
  });

  initHearts(wrapper);
}

function initHearts(container) {
  const hearts = container.querySelectorAll(".heart-btn");

  hearts.forEach(btn => {
    const card = btn.closest(".card");
    const id = card.dataset.id;
    const key = `fav-${id}`;

    if (localStorage.getItem(key)) btn.classList.add("active");

    btn.onclick = () => {
      const storage = JSON.parse(localStorage.getItem("favs")) || []
      btn.classList.toggle("active");
      if (btn.classList.contains("active")) {
        storage.push(card.outerHTML)
        localStorage.setItem("favs", JSON.stringify(storage))
      } else {
        localStorage.removeItem(key);
      }
    };
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("click", e => {
  const btn = e.target.closest(".add-to-cart-btn");
  if (!btn) return;

  const item = JSON.parse(btn.dataset.item);
  const cart = getCart();
  const found = cart.find(p => p.id === item.id);

  found ? found.qty++ : cart.push({ ...item, qty: 1 });
  saveCart(cart);
});

function renderBanner(el, img) {
  el.innerHTML = `
    <div class="flex justify-center py-10">
      <img src="${img}" class="rounded-3xl w-full">
    </div>
  `;
}
async function initPage() {
  renderCards(phonesEl, await fetchCategory("smartphones", 10));
  renderBanner(reklama1, "https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-16/DvAmWwCXU8V2EDK0d3bFFo7YbIpfPT8euXbpAkSWU6PxaThfpP4GeGHfrLJN.jpg");

  renderCards(laptopsEl, await fetchCategory("laptops"));
  renderBanner(reklama2, "https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-30/jRvSQq2QhdUCU8XjqZeMuymAFBTeCrWq5xqCqtZLCAYDA1yd4WHW5XPfFcAH.jpg");

  renderCards(groceriesEl, await fetchCategory("groceries", 2));
  renderBanner(reklama3, "https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-16/lxBGken4j14iTEsqGjvmwobnIQDy1JMz1RQK5H3yqsGkBFpatl5J5QgPdarc.jpg");

  renderCards(beautyEl, await fetchCategory("beauty", 10));
  renderCards(furnitureEl, await fetchCategory("furniture", 7));
}
initPage();

const style = document.createElement("style");
style.innerHTML = `
  .heart-btn.active .heart-icon path {
    fill: red;
    stroke: red;
  }
`;
document.head.appendChild(style);
new Swiper(".simpleSwiper", {
  slidesPerView: 1,
  loop: true,
  speed: 1500,
  autoplay: {
    delay: 60000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
const counters = document.querySelectorAll('[data-count]');

counters.forEach(counter => {
  let target = parseInt(counter.getAttribute('data-count'));
  let current = target;

  const interval = setInterval(() => {
    current--;
    if (current < 0) {
      clearInterval(interval);
      current = 0;
    }
    counter.textContent = current;
  }, 1000);
});
async function fetchCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    return await res.json();
  } catch (e) {
    console.error("Category fetch error:", e);
    return [];
  }
}

async function renderCategorySwiper() {
  const categories = await fetchCategories();
  const wrapper = document.getElementById("categoryWrapper");

  wrapper.innerHTML = "";

  categories.forEach(category => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide  text-center";

    slide.innerHTML = `
      <div class="w-24 h-24 rounded-full border-4 border-red-600 flex items-center justify-center mx-auto bg-white">
        <span class="text-xs font-semibold text-center px-2">
          ${category}
        </span>
      </div>
      <p class="mt-2 text-sm font-medium ">${category}</p>
    `;

    wrapper.appendChild(slide);
  });

  new Swiper(".categorySwiper", {
    slidesPerView: "10",
    spaceBetween: 24,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

document.addEventListener("DOMContentLoaded", renderCategorySwiper);
