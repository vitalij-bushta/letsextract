// Custom Scripts
// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");
  const navBtn = document.querySelector(".button");
  const selectBtn = document.querySelector("#select");
  burger.addEventListener("click", () => {
    if (!menu.classList.contains("active")) {
      menu.classList.add("active");
      navBtn.classList.add("active");
      selectBtn.classList.add("active");
      burger.classList.add("active-burger");
      body.classList.add("locked");
    } else {
      menu.classList.remove("active");
      navBtn.classList.remove("active");
      selectBtn.classList.remove("active");
      burger.classList.remove("active-burger");
      body.classList.remove("locked");
    }
  });
  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove("active");
      navBtn.classList.remove("active");
      selectBtn.classList.remove("active");
      burger.classList.remove("active-burger");
      body.classList.remove("locked");
    }
  });
}
burgerMenu();

// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector("nav");

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1;
  if (window.scrollY >= breakpoint) {
    nav.classList.add("fixed__nav");
  } else {
    nav.classList.remove("fixed__nav");
  }
}
window.addEventListener("scroll", fixedNav);

const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? "placeholder не указан";

  const items = data.map((item) => {
    let cls = "";
    if (item.id === selectedId) {
      text = item.value;
      cls = "selected";
    }
    return `
            <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
        `;
  });
  return `
        <input type="hidden" class="hidden__input">
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
            <span data-type="value">${text}</span>
            <div alt="arrow" data-type="arrow" class="select__arrow">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5609 4.32739L6.5 8.28589L2.43913 4.32739C2.36657 4.25652 2.26917 4.21685 2.16775 4.21685C2.06633 4.21685 1.96893 4.25652 1.89638 4.32739C1.86125 4.36181 1.83334 4.40289 1.81428 4.44824C1.79523 4.49358 1.78542 4.54227 1.78542 4.59145C1.78542 4.64063 1.79523 4.68932 1.81428 4.73467C1.83334 4.78001 1.86125 4.82109 1.89638 4.85551L6.21644 9.06751C6.2923 9.14146 6.39406 9.18285 6.5 9.18285C6.60594 9.18285 6.7077 9.14146 6.78356 9.06751L11.1036 4.85633C11.139 4.82188 11.1671 4.78069 11.1863 4.7352C11.2055 4.68971 11.2154 4.64083 11.2154 4.59145C11.2154 4.54207 11.2055 4.49319 11.1863 4.4477C11.1671 4.40221 11.139 4.36102 11.1036 4.32658C11.0311 4.25571 10.9337 4.21603 10.8322 4.21603C10.7308 4.21603 10.6334 4.25571 10.5609 4.32658V4.32739Z" />
</svg>
            </div>
        </div>
        <div class="select__dropdown">
            <ul class="select__list">
                ${items.join("")}
            </ul>
        </div>
    `;
};
class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.render();
    this.setup();
  }

  render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }
  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === "input") {
      this.toggle();
    } else if (type === "item") {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type === "backdrop") {
      this.close();
    }
  }

  get isOpen() {
    return this.$el.classList.contains("open");
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;

    this.$el
      .querySelectorAll(`[data-type="item"]`)
      .forEach((el) => el.classList.remove("selected"));
    this.$el.querySelector(`[data-id="${id}"]`).classList.add("selected");

    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add("open");
    this.$arrow.classList.add("open");
  }

  close() {
    this.$el.classList.remove("open");
    this.$arrow.classList.remove("open");
  }

  destroy() {
    this.$el.removeEventListener("click", this.clickHandler);
    this.$el.innerHTML = "";
  }
}

// Инициализация плагина
const select = new Select("#select", {
  selectedId: "1",
  data: [
    { id: "1", value: "RU" },
    { id: "2", value: "UA" },
    { id: "3", value: "EN" },
  ],
  onSelect(item) {
    const input = document.querySelector(".hidden__input");
    input.value = item.value;
  },
});



        const swiper = new Swiper('.swiper', {
          slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
  
          // If we need pagination
          pagination: {
            el: '.swiper-pagination',
          },
        
          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        
          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar',
          },
      
          // Responsive breakpoints
          breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
          },
          650: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // when window width is >= 480px
          990: {
            slidesPerView: 2,
            spaceBetween: 30
          },
        }
        });









