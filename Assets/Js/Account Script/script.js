const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach(ddn => {

  const select = ddn.querySelector('.select');
  const caret = ddn.querySelector('.caret');
  const menu = ddn.querySelector('.menu');


  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
    menu.classList.toggle('menu-open-self');
  });

  //intilizing the cart earlier 
  if (menu.classList.contains("menu-cart")) {
    const menuwrap = menu.querySelector('.menu-wrap');
    if (menuwrap.childElementCount < 1) {
      const btn = menu.querySelector('.btn');
      btn.classList.add('disabled');
      return;
    }
    const items = menuwrap.querySelectorAll('li');
    items.forEach(item => {
      const deleteBtn = item.querySelector('.bx-trash');
      deleteBtn.addEventListener('click', addDelFunction);

      const plusBtn = item.querySelector('.plus');
      plusBtn.addEventListener('click', clickHandler);

      const minusBtn = item.querySelector('.minus');
      minusBtn.addEventListener('click', clickHandler);

    });

  }

});

function clickHandler(event) {
  console.log(event.target);
  var countEl = event.target.parentNode.querySelector(".qty-input");
  if (event.target.classList.contains("plus")) {
    countEl.value = Number(countEl.value) + 1;
  } else {
    if (countEl.value > 1) {
      countEl.value = Number(countEl.value) - 1;
    }
  }
  // triggerEvent(countEl, "change");
}


const products = document.querySelectorAll(".product");
products.forEach(product => {
  const y = product.querySelector('.btn-cart');
  y.addEventListener('click', () => {
    const id = product.querySelector('.id-product').value;
    const title = product.querySelector('.title').innerHTML;
    const item = addToCart(id, title);
    if (item) {
      iteminit(item);
    }
  })
});

function addToCart(id, title) {
  const item = elementFromHtml(
    `
    <li>
    <input type="hidden" class="id" name="id" value="${id}">
    <div class="title m-0 row align-items-center">
      <div class="col-8 title">${title}</div>
      <div class="col-3 qty-btn d-flex gap-3 justify-content-center align-items-center">
        <div class="minus"  class="col-4">-</div>
        <input type="text"  value="1"  class="col-4 qty-input">
        <div class="plus" class="col-4">+</div>
      </div>
      <div class="col-1 delete-wrap text-center"><i class='bx bx-trash'></i></div>
    </div>
  </li>
    `);
  const menu = document.querySelector('.menu-wrap');
  const items = document.querySelectorAll('.menu-wrap li');
  let isDuplicate = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].querySelector('.id').value === id) {
      isDuplicate = true;
      break;
    }
  }
  if (!isDuplicate) {
    menu.appendChild(item);
    return item;
  }
  return false;
}

function iteminit(item) {
  const btn = document.querySelector('.btn');
  btn.classList.remove('disabled');

  const deleteBtn = item.querySelector('.bx-trash');
  deleteBtn.addEventListener('click', addDelFunction);

  const plusBtn = item.querySelector('.plus');
  plusBtn.addEventListener('click', clickHandler);

  const minusBtn = item.querySelector('.minus');
  minusBtn.addEventListener('click', clickHandler);

  menuOpen();

}

function menuOpen() {
  const menuCart = document.querySelector('.menu-cart');

  if (!menuCart.classList.contains('menu-open')) {
    menuCart.classList.add('menu-open');
  }
  setTimeout(() => {
    if (menuCart.classList.contains('menu-open') && !menuCart.classList.contains('menu-open-self')) {
      menuCart.classList.remove('menu-open');
    }
  }, 2000);
}

function addDelFunction(event) {
  const menuwrap = document.querySelector('.menu-wrap');
  const listItem = event.target.parentNode.parentNode.parentNode;
  menuwrap.removeChild(listItem);
  if (menuwrap.childElementCount < 1) {
    const btn = document.querySelector('.btn');
    btn.classList.add('disabled');
    return;
  }
}

function elementFromHtml(html) {
  const template = document.createElement("template");

  template.innerHTML = html.trim();

  return template.content.firstElementChild;
}