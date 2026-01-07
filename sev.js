function render(data) {

  data.forEach((e, i) => {
    const wrapper = document.querySelector(".wrapper")
    data.forEach((e) => {
      wrapper.innerHTML += e
    })
  });

}


const favorites = JSON.parse(localStorage.getItem("favs"))

render(favorites)