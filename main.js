  const overlay = document.getElementById("overlay")
  const modal = document.getElementById("modal")
  const closeModalBtn = document.getElementById("closeModal")

  document.querySelectorAll(".openModal").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault() 
      overlay.classList.remove("hidden")

      overlay.classList.add("flex")

      document.body.style.overflow = "hidden"



      modal.focus()

    })
  })


  
  function renderCards() {
  const wrapper = document.querySelector(`.wrapper1`)

  wrapper.innerHTML = ""
    getCards.forEach(p => {
      wrapper.innerHTML = `              <div class="w-[344px] h-[516px] flex flex-col gap-[20px] relative bg-white rounded-lg px-[20px] ">
              <div class="felx  h-[280px]">
                 <img class="h-[280px] w-full p-[30px]" src="" alt="">
<button class="btnHeart">
                 <svg class="w-[30px] h-[30px] p-[5px]  absolute top-[20px] right-[20px] rounded-full bg-white " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z" fill="#808080"/>
</svg>
      </button>
<button class="btnStatic">
                <svg class=" w-[30px] absolute p-[5px] top-[60px] rotate-90 right-[20px] h-[30px]" width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path fill="#808080" fill-rule="evenodd" d="M18 5a1 1 0 100-2H2a1 1 0 000 2h16zm0 4a1 1 0 100-2h-8a1 1 0 100 2h8zm1 3a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 5a1 1 0 100-2h-8a1 1 0 100 2h8z"/>
</svg>
               </button>
              </div>
              <div class="flex flex-col gap-[5px] pb-[40px]">
                <p>Apple Magic mouse 3</p>
                <h2 class="text-[18px] font-semibold pt-[10px]">1  389  951 сум</h2>
                <p class="px-[3px] py-[2px] rounded-md w-[50%] bg-yellow-400 text-[14px]">163  000 сум x 12 мес</p>
              </div>
              <div class="flex gap-[10px] items-center">
<button class="openModal korzinkaBtn w-[36px] h-[35px] border-[2px] rounded-md flex justify-center items-center border-black">
                  <svg class="w-[20px]" fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M31.739 8.875c-0.186-0.264-0.489-0.422-0.812-0.422h-21.223l-1.607-5.54c-0.63-2.182-2.127-2.417-2.741-2.417h-4.284c-0.549 0-0.993 0.445-0.993 0.993s0.445 0.993 0.993 0.993h4.283c0.136 0 0.549 0 0.831 0.974l5.527 20.311c0.12 0.428 0.511 0.724 0.956 0.724h13.499c0.419 0 0.793-0.262 0.934-0.657l4.758-14.053c0.11-0.304 0.064-0.643-0.122-0.907zM25.47 22.506h-12.046l-3.161-12.066h19.253zM23.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5zM14.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5z"></path>
</svg>
                </button>
                <button class="openModal hover:bg-red-50 transition-all border-2 text-red-500 text-center w-[244px] p-[4px]  rounded-md border-red-500">
                  В рассрочку
                </button>
              </div>
            </div>`
    })
}



	
  function closeModal() {
    overlay.classList.add("hidden")
    overlay.classList.remove("flex")
    document.body.style.overflow = "auto"
  }

  closeModalBtn.addEventListener("click", closeModal)



  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal()
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal()
  })


  
  async function getCards() {
    let res = await fetch(`https://dummyjson.com/products`) 
    let data = await res.json()
    console.log(data);
    
  }try {
    
  } catch (error) {
    console.log("Xatolik chiqdi", error);
    
  }finally{
    
  }

  getCards()