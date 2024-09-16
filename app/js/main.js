$(function () {
  // function searchBar() {
  //   $('#searchText').on('keyup', function () {
  //     let searchString = $(this).val();
  //     $("ul li ").each(function (index, value) {

  //       currentName = $(value).text()
  //       if (currentName.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
  //         $(value).show();
  //       } else {
  //         $(value).hide();
  //       }
  //     });
  //   });
  // };

  // searchBar();

  class SlideStories {
    constructor(id) {
      this.slide = document.querySelector(`[data-slide=${id}]`);
      this.active = 0;
      this.init();
    }

    activeSlide(index) {
      this.active = index;
      this.items.forEach((item) => {
        item.classList.remove("active");
      });
      this.items[index].classList.add("active");
      this.thumbItems.forEach((item) => {
        item.classList.remove("active");
      });
      this.thumbItems[index].classList.add("active");
      this.autoSlide();
      console.log(this.thumbItems.classList);
    }

    prev() {
      if (this.active > 0) {
        this.activeSlide(this.active - 1);
      } else {
        this.activeSlide(this.items.length - 1);
      }
    }

    next() {
      if (this.active < this.items.length - 1) {
        this.activeSlide(this.active + 1);
      } else {
        this.activeSlide(0);
      }
    }

    addNavigation() {
      const nextBtn = this.slide.querySelector(".slide-next");
      const prevBtn = this.slide.querySelector(".slide-prev");
      nextBtn.addEventListener("click", this.next);
      prevBtn.addEventListener("click", this.prev);
    }

    addThumbItems() {
      this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
      this.thumbItems = Array.from(this.thumb.children);
    }

    autoSlide() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.next, 5000);
    }

    init() {
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
      this.items = this.slide.querySelectorAll(".slide-items > *");
      this.thumb = this.slide.querySelector(".slide-thumb");
      this.addThumbItems();
      this.activeSlide(0);
      this.addNavigation();
    }
  }

  new SlideStories("slide");



  // sort btn
  const sorter = btn => {
    const cards = [...document.querySelectorAll('.catalog')]
    const container = document.querySelector('.catalog__inner')
    let deck = []
    let btnDisabled = document.querySelector('.disabled')
    const filter = id => id.dataset.filter
    const type = id => id.dataset.type

    cards.forEach(el => {
      const from = id => el.querySelector(id).innerText
      let card = {val: from('.value'), name: from('h3'), card: el}
      deck.push(card)
      el.remove()
    })


    if (btnDisabled) {
      btnDisabled.classList.toggle('disabled')
      if (btn == btnDisabled)
        btnDisabled.dataset.type = type(btnDisabled) == 'вниз' ? 'верх' : 'вниз'
      btnDisabled.innerText = `Сорт. по ${filter(btnDisabled)}-${type(btnDisabled)}!`
    }
    btn.innerText = `Сорт. по ${filter(btn)}-${type(btn)}!`
    btn.classList.toggle('disabled')
    deck.sort((a, b) => {
      if (filter(btn) == 'имени')
        return type(btn) == 'верх' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      if (filter(btn) == 'цена')
        return type(btn) == "верх" ? a.val - b.val : b.val - a.val
    })
    deck.forEach(el => container.append(el.card))
  }

  document.querySelectorAll('.catalog-btn').forEach(btn =>
    btn.addEventListener('click', e => sorter(e.currentTarget)))


})

