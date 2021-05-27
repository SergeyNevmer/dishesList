"use strict";

import arrDish from "./arrayDish.js";

const theme = {
  LIGHT: "light-theme",
  DARK: "dark-theme",
};

const links = {
  body: document.body,
  slider: document.querySelector(".theme-switch__control"),
  sliderInfo: document.querySelector(".theme-switch__toggle"),
  menuContainer: document.querySelector(".js-menu"),
};

let size = [];
let container = [];

if (localStorage.getItem("theme")) {
  let obj = JSON.parse(localStorage.getItem("theme"));
  build(obj);
}

links.slider.addEventListener("change", changeTheme);

function changeTheme() {
  if (links.sliderInfo.hasAttribute("checked") === false) {
    links.sliderInfo.setAttribute("checked", "");
    links.body.classList.remove(`${theme.LIGHT}`);
    links.body.classList.add(`${theme.DARK}`);
    let themeInfo = {
      checked: true,
      theme: `${theme.DARK}`,
    };
    localStorage.setItem("theme", JSON.stringify(themeInfo));
  } else if (links.sliderInfo.hasAttribute("checked") === true) {
    links.sliderInfo.removeAttribute("checked");
    links.body.classList.remove(`${theme.DARK}`);
    links.body.classList.add(`${theme.LIGHT}`);
    let themeInfo = {
      checked: false,
      theme: `${theme.LIGHT}`,
    };
    localStorage.setItem("theme", JSON.stringify(themeInfo));
  }
}

function build(obj) {
  let arr = [];
  for (let item of Object.values(obj)) {
    arr.push(item);
  }
  if (arr[0] === true) {
    links.sliderInfo.setAttribute("checked", "");
    links.body.classList.add(`${theme.DARK}`);
  }
  if (arr[0] === false) {
    links.sliderInfo.removeAttribute("checked");
    links.body.classList.add(`${theme.LIGHT}`);
  }
}

arrDish.forEach((item) => {
  let length = item.ingredients.length;
  size.push(item.ingredients.length);
  container.push(createListIngredients(length, item.ingredients));

  let elem = createCardDish(item);
  addItemInMenu(elem, links.menuContainer);
});

function createCardDish(item) {
  return `<li class="menu__item">
  <article class="card">
    <img
      src="${item.image}"
      alt="${item.name}"
      class="card__image"
    />
    <div class="card__content">
      <h2 class="card__name">${item.name}</h2>
      <p class="card__price">
        <i class="material-icons"> monetization_on </i>
        ${item.price} кредитов
      </p>
      <p class="card__descr">
        ${item.description}
      </p>
      <ul class="tag-list" id="${item.id}"></ul>
    </div>
    <button class="card__button button">
      <i class="material-icons button__icon"> shopping_cart </i>
      В корзину
    </button>
  </article>
</li>`;
}

function addItemInMenu(elem, place) {
  place.insertAdjacentHTML("beforeend", `${elem}`);
}

function createListIngredients(size, arr) {
  let container = [];
  let elem;
  let count = 0;
  for (let i = 0; i < size; i += 1) {
    elem = document.createElement("li");
    elem.setAttribute("class", "tag-list__item");
    elem.textContent = `${arr[count]}`;
    count += 1;
    container.push(elem);
  }
  return container;
}

//============================hardcode

const id = {
  one: document.querySelector("#XWaQXcbk0"),
  two: document.querySelector("#pkXzyRp1P"),
  three: document.querySelector("#QMom9q4Ku"),
  four: document.querySelector("#k2k0UrjZG"),
  five: document.querySelector("#j2k8U1jZd"),
  six: document.querySelector("#X2aQ7cvkd"),
  seven: document.querySelector("#nk3zy1pf8"),
  eight: document.querySelector("#b7k2U13fd"),
};

addItemsInDish(0, id.one);
addItemsInDish(1, id.two);
addItemsInDish(2, id.three);
addItemsInDish(3, id.four);
addItemsInDish(4, id.five);
addItemsInDish(5, id.six);
addItemsInDish(6, id.seven);
addItemsInDish(7, id.eight);

function addItemsInDish(value, place) {
  let num = 0;
  for (let i = 0; i < size[`${value}`]; i += 1) {
    place.append(container[`${value}`][`${num}`]);
    num += 1;
  }
}
