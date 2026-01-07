function createSnowflake() {
	const snowflake = document.createElement('div')
	snowflake.className = 'snowflake'
	snowflake.innerHTML = '❄️'

	snowflake.style.left = Math.random() * window.innerWidth + 'px'
	snowflake.style.fontSize = Math.random() * 10 + 10 + 'px'
	snowflake.style.opacity = Math.random()
	snowflake.style.animationDuration = Math.random() * 5 + 5 + 's'

	document.body.appendChild(snowflake)

	setTimeout(() => {
		snowflake.remove()
	}, 10000)
}

// qor tezligi
setInterval(createSnowflake, 200)

const phonesEl = document.getElementById('phones')
const reklama1 = document.getElementById('reklama1')
const laptopsEl = document.getElementById('laptops')
const reklama2 = document.getElementById('reklama2')
const groceriesEl = document.getElementById('groceries')
const beautyEl = document.getElementById('beauty')
const reklama3 = document.getElementById('reklama3')
const furnitureEl = document.getElementById('furniture')
const reklama4 = document.getElementById('reklama4')

const modal = document.getElementById('productModal')
const modalImg = document.getElementById('modalImg')
const modalTitle = document.getElementById('modalTitle')
const modalPrice = document.getElementById('modalPrice')
const closeModal = document.getElementById('closeModal')

const successModal = document.getElementById('successModal')
const closeSuccessModal = document.getElementById('closeSuccessModal')

const systemErrorModal = document.getElementById('systemErrorModal')

let successTimer = null
let allProducts = []
async function fetchCategory(category, limit = null) {
	const res = await fetch(`https://dummyjson.com/products/category/${category}`)
	const data = await res.json()
	return limit ? data.products.slice(0, limit) : data.products
}

function createCard(item, index, categoryName) {
	const safeItem = encodeURIComponent(JSON.stringify(item))

	return `
  <div class="max-w-[20%] p-2 bg-white rounded-xl shadow-md flex flex-col gap-3 relative transition-transform duration-300 ease-out hover:scale-[1.05]">
    <button class="heart-btn absolute top-3 right-3 w-[32px] h-[32px] rounded-full flex items-center justify-center shadow transition-transform duration-300 hover:scale-[1.05]" data-index="${categoryName}-${index}">
      <svg class="heart-icon" viewBox="0 0 24 24">
        <path d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      </svg>
    </button>

    <img src="${item.thumbnail}" alt="${
		item.title
	}" class="w-full h-[220px] object-contain transition-transform duration-300 hover:scale-105">
    <p class="font-semibold text-sm">${item.title}</p>
    <div>
      <p class="font-bold text-lg">${item.price.toLocaleString()} so'm</p>
      <p class="text-sm bg-yellow-400 w-[145px] h-[22px] text-center text-black font-medium rounded-md">
        ${(item.price / 12).toFixed(0)} so'm x 12 oy
      </p>
    </div>
    <div class="flex items-center gap-3 mt-2">
    <button class="border border-black rounded-md p-2 bg-white text-black hover:bg-black hover:text-white hover:border-white transition duration-300 active:scale-95"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"> <circle cx="10.07" cy="20.59" r="1.91" /> <circle cx="18.66" cy="20.59" r="1.91" /> <path d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10"/> <polyline points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91"/> </svg> </button>
      <button 
        class="add-to-cart-btn flex-1 border border-red-600 text-red-600 font-medium py-2 rounded-md hover:bg-red-600 hover:text-white transition"
        data-item="${safeItem}"
      >
        Korzinkaga
      </button>
    </div>
  </div>
  `
}

function renderCards(el, list, categoryName) {
	el.innerHTML = ''
	list.forEach((item, index) => {
		el.innerHTML += createCard(item, index, categoryName)
		console.log(el, list, categoryName)
	})
	initHearts(el)
}

function renderBanner(el, img) {
	el.innerHTML = `<div class="flex justify-center items-center py-[80px]">
    <img src="${img}" class="rounded-[30px] w-full transition-transform duration-500 ease-out hover:scale-[1.05]" alt="">
  </div>`
}

function initHearts(container = document) {
	const heartBtns = container.querySelectorAll('.heart-btn')
	heartBtns.forEach(btn => {
		const index = btn.dataset.index
		if (localStorage.getItem(`heartActive-${index}`) === 'true')
			btn.classList.add('active')
		btn.addEventListener('click', () => {
			btn.classList.toggle('active')
			localStorage.setItem(
				`heartActive-${index}`,
				btn.classList.contains('active')
			)
			console.log(
				` yurak ${index} ${
					btn.classList.contains('active')
						? 'like bosildi'
						: 'bosilgan lik ochirildi'
				}`
			)
		})
	})
}

function getCart() {
	return JSON.parse(localStorage.getItem('cart')) || []
}
function saveCart(cart) {
	localStorage.setItem('cart', JSON.stringify(cart))
}

document.addEventListener('click', e => {
	const btn = e.target.closest('.add-to-cart-btn')
	if (!btn) return

	let item
	try {
		item = JSON.parse(decodeURIComponent(btn.dataset.item))
	} catch (err) {
		console.error(' JSON parse error:', err)
		return
	}

	let cart = getCart()
	const exists = cart.find(p => p.id === item.id)
	if (!exists) cart.push({ ...item, qty: 1 })
	else exists.qty += 1
	saveCart(cart)
	console.log('korzika tugmasi bosildi:', cart)

	openModal(item)
})

function openModal(item) {
	modalImg.src = item.thumbnail
	modalTitle.textContent = item.title
	modalPrice.textContent = item.price.toLocaleString() + " so'm"
	modal.classList.remove('hidden')
	modal.classList.add('flex')
}
closeModal.addEventListener('click', () => {
	modal.classList.add('hidden')
	modal.classList.remove('flex')
})
modal.addEventListener('click', e => {
	if (e.target === modal) {
		modal.classList.add('hidden')
		modal.classList.remove('flex')
	}
})

function openSuccessModal() {
	successModal.classList.remove('hidden')
	successModal.classList.add('flex')
	successTimer = setTimeout(() => {
		triggerSystemError()
	}, 600)
}
function closeSuccess() {
	successModal.classList.add('hidden')
	successModal.classList.remove('flex')
	if (successTimer) {
		clearTimeout(successTimer)
		successTimer = null
	}
}
closeSuccessModal.addEventListener('click', closeSuccess)
successModal.addEventListener('click', e => {
	if (e.target === successModal) closeSuccess()
})

function triggerSystemError() {
	successModal.classList.add('hidden')
	modal.classList.add('hidden')
	systemErrorModal.classList.remove('hidden')
	systemErrorModal.classList.add('flex')
	document.body.classList.add('animate-pulse')
}

console.log('kard keldi:', getCart())

async function initPage() {
	const phones = await fetchCategory('smartphones', 10)
	allProducts = phones
	renderCards(phonesEl, phones, 'smartphones')
	renderBanner(
		reklama1,
		'https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-16/DvAmWwCXU8V2EDK0d3bFFo7YbIpfPT8euXbpAkSWU6PxaThfpP4GeGHfrLJN.jpg'
	)

	const laptops = await fetchCategory('laptops')
	renderCards(laptopsEl, laptops, 'laptops')
	renderBanner(
		reklama2,
		'https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-30/jRvSQq2QhdUCU8XjqZeMuymAFBTeCrWq5xqCqtZLCAYDA1yd4WHW5XPfFcAH.jpg'
	)

	const groceries = await fetchCategory('groceries', 2)
	renderCards(groceriesEl, groceries, 'groceries')
	renderBanner(
		reklama3,
		'https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-16/lxBGken4j14iTEsqGjvmwobnIQDy1JMz1RQK5H3yqsGkBFpatl5J5QgPdarc.jpg'
	)

	const beautyProducts = await fetchCategory('groceries', 10)
	renderCards(beautyEl, beautyProducts, 'beauty')
	renderBanner(
		reklama4,
		'https://olcha.uz/image/1440x302/homePage/cdn_1/2025-07-16/rNO2PjAlBe014UcE8TjOCPnvglnKhXZLeu4pC1hpl8qNTAO5xVNaaCm9Qq4n.jpg'
	)

	const furnitureProducts = await fetchCategory('groceries', 7)
	renderCards(furnitureEl, furnitureProducts, 'furniture')
}

const style = document.createElement('style')
style.innerHTML = `
.heart-btn.active .heart-icon path{
  fill:red !important;
  stroke:red !important;
}`
document.head.appendChild(style)

initPage()

const productCards = document.getElementById(`product-wrapper`)

async function productRender() {
	try {
		let res = await fetch(`https://dummyjson.com/products`)
		let data = await res.json()
		console.log(data)

		const laptops = await fetchCategory('laptops')
		renderCards(laptopsEl, laptops, 'laptops')
	} catch (error) {
		console.log('Xatolik', error)
	}
}

productRender()

const input = document.querySelector('.searchInput')
const wrapper = document.querySelector('.search-wrapper')

input.addEventListener('input', () => {
	const value = input.value.toLowerCase().trim()

	const filtered = allProducts.filter(item =>
		item.title.toLowerCase().includes(value)
	)
	console.log(filtered)

	renderCards(wrapper, filtered, 'undefind')
})
