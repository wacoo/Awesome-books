const form = document.getElementById('frm_books');
const display = document.getElementById('display');

function saveBooks(data) {
  const strData = JSON.stringify(data);
  localStorage.setItem('data', strData);
}

let catalog = {};

function restoreBooks() {
  const data = localStorage.getItem('data');
  const objData = JSON.parse(data);
  catalog = objData || {};
}

function displayData(k) {
  const bookParent = document.createElement('div');
  bookParent.classList.add(`parent-${k}`);
  bookParent.innerHTML += catalog[k].title;
  bookParent.innerHTML = `${bookParent.innerHTML}<br>${catalog[k].author}`;
  bookParent.innerHTML = `${bookParent.innerHTML}<br> <button id="${k}"> Remove </button>`;

  form.style.marginTop = '12px';

  bookParent.style.borderBottom = 'black solid 2px';
  bookParent.style.paddingTop = '12px';
  bookParent.style.paddingBottom = '12px';
  bookParent.style.width = '300px';
  display.appendChild(bookParent);
  saveBooks(catalog);
}

function removeBook(a) {
  const remove = document.getElementById(a);
  if (remove) {
    remove.addEventListener('click', function removeContent(event) {
      const button = event.target;
      const parent = button.parentNode;
      parent.parentNode.removeChild(parent);
      delete catalog[this.id];
      saveBooks(catalog);
    });
  }
}

let i = 0;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = {};
  book.title = form.elements.title.value;
  book.author = form.elements.author.value;
  form.elements.title.value = '';
  form.elements.author.value = '';
  catalog[i] = book;
  displayData(i);
  removeBook(i);
  i += 1;
});

window.addEventListener('load', () => {
  restoreBooks();
  const keys = Object.keys(catalog);
  for (let i = 0; i < keys.length; i += 1) {
    displayData(keys[i]);
    removeBook(keys[i]);
  }
});
