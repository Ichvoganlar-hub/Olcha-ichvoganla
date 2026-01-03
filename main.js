const phonesEl = document.getElementById("phones");
const reklama1 = document.getElementById("reklama1");
const laptopsEl = document.getElementById("laptops");
const reklama2 = document.getElementById("reklama2");
const automotiveEl = document.getElementById("automotive");
const reklama3 = document.getElementById("reklama3");
const groceriesEl = document.getElementById("groceries");
const beautyEl = document.getElementById("beauty");
const reklama4 = document.getElementById("reklama4");
const furnitureEl = document.getElementById("furniture");

async function fetchCategory(category, limit = null) {
  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  const data = await res.json();
  return limit ? data.products.slice(0, limit) : data.products;
}

function renderCards(el, list) {
  el.innerHTML = "";
  list.forEach((item, index) => {
    el.innerHTML += createCard(item, index);
  });

  initHearts(el); 
}

function renderBanner(el, img) {
  el.innerHTML = `
    <div class="flex justify-center items-center py-[80px]">
      <img
        src="${img}"
        class="rounded-[30px] w-full transition-transform duration-500 ease-out hover:scale-[1.05]"
        alt=""
      >
    </div>
  `;
}

function createCard(item, index) {
  return `
  <div class="max-w-[20%] p-2 bg-white rounded-xl shadow-md flex flex-col gap-3 relative transition-transform duration-300 ease-out hover:scale-[1.05]">
    <!-- HEART BTN -->
    <button class="heart-btn absolute top-3 right-3 w-[32px] h-[32px] rounded-full flex items-center justify-center shadow transition-transform duration-300 hover:scale-[1.05]" data-index="${index}">
      <svg class="heart-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    </button>

    <!-- RASM -->
    <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-[220px] object-contain transition-transform duration-300 hover:scale-105">

    <!-- NOM -->
    <p class="font-semibold text-sm">${item.title}</p>

    <!-- NARX -->
    <div>
      <p class="font-bold text-lg">${item.price.toLocaleString()} so'm</p>
      <p class="text-sm bg-yellow-400 w-[145px] h-[22px] text-center text-black font-medium rounded-md">
        ${(item.price / 12).toFixed(0)} so'm x 12 oy
      </p>
    </div>

    <!-- TUGMALAR -->
    <div class="flex items-center gap-3 mt-2">
      <button class="border border-black rounded-md p-2 bg-white text-black hover:bg-black hover:text-white hover:border-white transition duration-300 active:scale-95">
        <!-- Icon SVG -->
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <circle cx="10.07" cy="20.59" r="1.91" />
          <circle cx="18.66" cy="20.59" r="1.91" />
          <path d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10"/>
          <polyline points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91"/>
        </svg>
      </button>

      <button class="flex-1 border border-red-600 text-red-600 font-medium py-2 rounded-md hover:bg-red-600 hover:text-white transition">
        Korzinkaga
      </button>
    </div>
  </div>
  `;
}

function initHearts(container = document) {
  const heartBtns = container.querySelectorAll('.heart-btn');

  heartBtns.forEach((btn) => {
    const index = btn.dataset.index;

    if(localStorage.getItem(`heartActive-${index}`) === 'true') {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      localStorage.setItem(`heartActive-${index}`, btn.classList.contains('active'));
    });
  });
}

async function initPage() {
  const phones = await fetchCategory("smartphones", 10);
  renderCards(phonesEl, phones);

  renderBanner(reklama1, "https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-16/DvAmWwCXU8V2EDK0d3bFFo7YbIpfPT8euXbpAkSWU6PxaThfpP4GeGHfrLJN.jpg");

  const laptops = await fetchCategory("laptops");
  renderCards(laptopsEl, laptops);

  renderBanner(reklama2, "https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-30/jRvSQq2QhdUCU8XjqZeMuymAFBTeCrWq5xqCqtZLCAYDA1yd4WHW5XPfFcAH.jpg");

  const groceries = await fetchCategory("groceries", 2);
  renderCards(groceriesEl, groceries);

  renderBanner(reklama3, "https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-16/lxBGken4j14iTEsqGjvmwobnIQDy1JMz1RQK5H3yqsGkBFpatl5J5QgPdarc.jpg");

  const beautyProducts = await fetchCategory("groceries", 10);
  renderCards(beautyEl, beautyProducts);

  renderBanner(reklama4, "https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-16/rNO2PjAlBe014UcE8TjOCPnvglnKhXZLeu4pC1hpl8qNTAO5xVNaaCm9Qq4n.jpg");

  const furnitureProducts = await fetchCategory("groceries", 7);
  renderCards(furnitureEl, furnitureProducts);
}

const style = document.createElement('style');
style.innerHTML = `
.heart-btn.active .heart-icon path {
  fill: red;
  stroke: red;
}
`;
document.head.appendChild(style);

initPage();
