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

async function applemicard() {
  const res =  await fetch('https://dummyjson.com/products')
  const data = await res.json()
  const kesilgan = data.products.slice(0,1)
  console.log(kesilgan);
  
  
  const efve = document.querySelector('#product-wrapper') 
  kesilgan.forEach(element => {
  let applediv = document.createElement(`div`)  
  applediv.classList.add(`appleCards`)

  
  applediv.innerHTML = `
          <div class="container max-w-7xl mx-auto">
          <div class="flex flex-col gap-[10px]">
            <div class="flex justify-between">
              <div>
                <h3 class="text-[32px] font-semibold">Техника Apple</h3>
              </div>
              <div class="flex items-center">
                <a class="text-[13px] text-red-600" href="">Посмотреть все</a>
                <img class="w-[20px]" src="${element.images}" alt="" />
              </div>
            </div>
            <div class="flex gap-[20px]">
              <div  class="flex gap-5 flex-wrap">
                  <div
                    class="w-[350px]  gap-[20px] items-center justify-center relative bg-white rounded-lg px-[20px]">
                    <div class="">
                      <img class="w-[300px]"
                        src="${element.images.slice(0)}"
                        alt="" />
                      <button class="btnHeart">
                        <svg class="w-[30px] h-[30px] p-[5px] absolute top-[20px] right-[20px] rounded-full bg-white"
                          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
                            fill="#808080" />
                        </svg>
                      </button>
                      <button class="btnStatic">
                        <svg class="w-[30px] absolute p-[5px] top-[60px] rotate-90 right-[20px] h-[30px]" width="800px"
                          height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                          <path fill="#808080" fill-rule="evenodd"
                            d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm0 4a1 1 0 100-2h-8a1 1 0 100 2h8zm1 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 5a1 1 0 100-2h-8a1 1 0 100 2h8z" />
                        </svg>
                      </button>
                    </div>
                    <div class="flex flex-col gap-2">
                      <div class="flex flex-col justify-center gap-[3px]">
                        <p class="w-[280px]">
                        ${element.title}
                        </p>
                        <h2 class="text-[18px] font-semibold">
                          1 389 951 сум
                        </h2>
                        <p class="px-[3px] py-[2px] rounded-md w-[50%] bg-yellow-400 text-[14px]">
                          163 000 сум x 12 мес
                        </p>
                      </div>
                      <div class="flex gap-[10px] items-center pb-[5px]">
                        <button
                          class="korzinkaBtn w-[36px] h-[35px] border-[2px] rounded-md flex justify-center items-center border-black">
                          <svg class="w-[20px]" fill="#000000" viewBox="0 0 32 32" version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M31.739 8.875c-0.186-0.264-0.489-0.422-0.812-0.422h-21.223l-1.607-5.54c-0.63-2.182-2.127-2.417-2.741-2.417h-4.284c-0.549 0-0.993 0.445-0.993 0.993s0.445 0.993 0.993 0.993h4.283c0.136 0 0.549 0 0.831 0.974l5.527 20.311c0.12 0.428 0.511 0.724 0.956 0.724h13.499c0.419 0 0.793-0.262 0.934-0.657l4.758-14.053c0.11-0.304 0.064-0.643-0.122-0.907zM25.47 22.506h-12.046l-3.161-12.066h19.253zM23.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5zM14.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5z">
                            </path>
                          </svg>
                        </button>
                        <button
                          class="hover:bg-red-50 transition-all border-2 text-red-500 text-center w-[244px] p-[4px] rounded-md border-red-500">
                          В рассрочку
                        </button>
                      </div>
                    </div>
                  </div>
              </div>

              <!-- bowqa img qatori -->
              <a href="">
                <div class="flex  w-full h-[275px] gap-[10px] flex-wrap">
                  <iframe class="rounded-lg" width="450" height="276"
                    src="https://www.youtube.com/embed/SH3lR2GLgT0?si=jrzO_tjV44DSGU5H" title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                  <div
                    class="w-[450px] flex gap-[20px] items-center justify-center relative bg-white rounded-lg px-[20px]">
                    <div class="">
                      <img class="w-[195px]"
                        src="${element.images.slice()}"
                        alt="" />
                      <button class="btnHeart">
                        <svg class="w-[30px] h-[30px] p-[5px] absolute top-[20px] right-[20px] rounded-full bg-white"
                          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
                            fill="#808080" />
                        </svg>
                      </button>
                      <button class="btnStatic">
                        <svg class="w-[30px] absolute p-[5px] top-[60px] rotate-90 right-[20px] h-[30px]" width="800px"
                          height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                          <path fill="#808080" fill-rule="evenodd"
                            d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm0 4a1 1 0 100-2h-8a1 1 0 100 2h8zm1 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 5a1 1 0 100-2h-8a1 1 0 100 2h8z" />
                        </svg>
                      </button>
                    </div>
                    <div class="flex flex-col gap-2">
                      <div class="flex flex-col justify-center gap-[3px]">
                        <p class="w-[280px]">
                          Magic Keyboard Russian 12.9-inch 2021 Белый
                        </p>
                        <h2 class="text-[18px] font-semibold">
                          1 389 951 сум
                        </h2>
                        <p class="px-[3px] py-[2px] rounded-md w-[50%] bg-yellow-400 text-[14px]">
                          163 000 сум x 12 мес
                        </p>
                      </div>
                      <div class="flex gap-[10px] items-center">
                        <button
                          class="korzinkaBtn w-[36px] h-[35px] border-[2px] rounded-md flex justify-center items-center border-black">
                          <svg class="w-[20px]" fill="#000000" viewBox="0 0 32 32" version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M31.739 8.875c-0.186-0.264-0.489-0.422-0.812-0.422h-21.223l-1.607-5.54c-0.63-2.182-2.127-2.417-2.741-2.417h-4.284c-0.549 0-0.993 0.445-0.993 0.993s0.445 0.993 0.993 0.993h4.283c0.136 0 0.549 0 0.831 0.974l5.527 20.311c0.12 0.428 0.511 0.724 0.956 0.724h13.499c0.419 0 0.793-0.262 0.934-0.657l4.758-14.053c0.11-0.304 0.064-0.643-0.122-0.907zM25.47 22.506h-12.046l-3.161-12.066h19.253zM23.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5zM14.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5z">
                            </path>
                          </svg>
                        </button>
                        <button
                          class="hover:bg-red-50 transition-all border-2 text-red-500 text-center w-[244px] p-[4px] rounded-md border-red-500">
                          В рассрочку
                        </button>
                      </div>
                    </div>
                  </div>
                   <div
                    class=" items-center justify-center relative bg-white rounded-lg px-[10px]">
                    <div class="">
                      <img class=""
                        src="https://olcha.uz/image/220x220/products/oeOsArYZhSFQeIFhNzxJpcrKS6IIfgYx8UAor7Qk51Y9xjkUY3t8zJdu29ve.jpg"
                        alt="" />
                      <button class="btnHeart">
                        <svg class="w-[30px] h-[30px] p-[5px] absolute top-[20px] right-[20px] rounded-full bg-white"
                          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
                            fill="#808080" />
                        </svg>
                      </button>
                      <button class="btnStatic">
                        <svg class="w-[30px] absolute p-[5px] top-[60px] rotate-90 right-[20px] h-[30px]" width="800px"
                          height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                          <path fill="#808080" fill-rule="evenodd"
                            d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm0 4a1 1 0 100-2h-8a1 1 0 100 2h8zm1 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 5a1 1 0 100-2h-8a1 1 0 100 2h8z" />
                        </svg>
                      </button>
                    </div>
                    <div class="flex flex-col gap-2">
                      <div class="flex flex-col justify-center gap-[3px]">
                        <p class="w-[280px]">
                          Magic Keyboard Russian 12.9-inch 2021 Белый
                        </p>
                        <h2 class="text-[18px] font-semibold">
                          1 389 951 сум
                        </h2>
                        <p class="px-[3px] py-[2px] rounded-md w-[50%] bg-yellow-400 text-[14px]">
                          163 000 сум x 12 мес
                        </p>
                      </div>
                      <div class="flex gap-[10px] pb-[5px] items-center ">
                        <button
                          class="korzinkaBtn w-[36px] h-[35px] border-[2px] rounded-md flex justify-center items-center border-black">
                          <svg class="w-[20px]" fill="#000000" viewBox="0 0 32 32" version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M31.739 8.875c-0.186-0.264-0.489-0.422-0.812-0.422h-21.223l-1.607-5.54c-0.63-2.182-2.127-2.417-2.741-2.417h-4.284c-0.549 0-0.993 0.445-0.993 0.993s0.445 0.993 0.993 0.993h4.283c0.136 0 0.549 0 0.831 0.974l5.527 20.311c0.12 0.428 0.511 0.724 0.956 0.724h13.499c0.419 0 0.793-0.262 0.934-0.657l4.758-14.053c0.11-0.304 0.064-0.643-0.122-0.907zM25.47 22.506h-12.046l-3.161-12.066h19.253zM23.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5zM14.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5z">
                            </path>
                          </svg>
                        </button>
                        <button
                          class="hover:bg-red-50 transition-all border-2 text-red-500 text-center w-[244px] p-[4px] rounded-md border-red-500">
                          В рассрочку
                        </button>
                      </div>
                    </div>
                  </div>
                     <div
                    class="  gap-[20px] items-center justify-center relative bg-white rounded-lg px-[20px]">
                    <div class="">
                      <img class=""
                        src="https://olcha.uz/image/220x220/products/oeOsArYZhSFQeIFhNzxJpcrKS6IIfgYx8UAor7Qk51Y9xjkUY3t8zJdu29ve.jpg"
                        alt="" />
                      <button class="btnHeart">
                        <svg class="w-[30px] h-[30px] p-[5px] absolute top-[20px] right-[20px] rounded-full bg-white"
                          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
                            fill="#808080" />
                        </svg>
                      </button>
                      <button class="btnStatic">
                        <svg class="w-[30px] absolute p-[5px] top-[60px] rotate-90 right-[20px] h-[30px]" width="800px"
                          height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                          <path fill="#808080" fill-rule="evenodd"
                            d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm0 4a1 1 0 100-2h-8a1 1 0 100 2h8zm1 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 5a1 1 0 100-2h-8a1 1 0 100 2h8z" />
                        </svg>
                      </button>
                    </div>
                    <div class="flex flex-col gap-2">
                      <div class="flex flex-col justify-center gap-[3px]">
                        <p class="w-[280px]">
                          Magic Keyboard Russian 12.9-inch 2021 Белый
                        </p>
                        <h2 class="text-[18px] font-semibold">
                          1 389 951 сум
                        </h2>
                        <p class="px-[3px] py-[2px] rounded-md w-[50%] bg-yellow-400 text-[14px]">
                          163 000 сум x 12 мес
                        </p>
                      </div>
                      <div class="flex gap-[10px] pb-[5px] items-center ">
                        <button
                          class="korzinkaBtn w-[36px] h-[35px] border-[2px] rounded-md flex justify-center items-center border-black">
                          <svg class="w-[20px]" fill="#000000" viewBox="0 0 32 32" version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M31.739 8.875c-0.186-0.264-0.489-0.422-0.812-0.422h-21.223l-1.607-5.54c-0.63-2.182-2.127-2.417-2.741-2.417h-4.284c-0.549 0-0.993 0.445-0.993 0.993s0.445 0.993 0.993 0.993h4.283c0.136 0 0.549 0 0.831 0.974l5.527 20.311c0.12 0.428 0.511 0.724 0.956 0.724h13.499c0.419 0 0.793-0.262 0.934-0.657l4.758-14.053c0.11-0.304 0.064-0.643-0.122-0.907zM25.47 22.506h-12.046l-3.161-12.066h19.253zM23.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5zM14.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5z">
                            </path>
                          </svg>
                        </button>
                        <button
                          class="hover:bg-red-50 transition-all border-2 text-red-500 text-center w-[244px] p-[4px] rounded-md border-red-500">
                          В рассрочку
                        </button>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </a>

              <!--bowqa a href-->
            </div>
          </div>
        </div>
  `
  
  efve.append(applediv)
  
  });
  
}
applemicard()