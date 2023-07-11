const form = document.getElementById('frm_books');
const display = document.getElementById('display');

function saveBooks(data) {
  const strData = JSON.stringify(data);
  localStorage.setItem('data', strData);
}

//Classes
class Book {
  constactor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Catalog {
  constructor(book) {
    this.book = book;
  }
}

let catalog = new Catalog();

function restoreBooks() {
  const data = localStorage.getItem('data');
  const objData = JSON.parse(data);
  catalog = objData || {};
}

function displayData(k) {
  const bookParent = document.createElement('div');
  bookParent.classList.add(`parent-${k}`);
  bookParent.classList.add('book-parent');
  bookParent.innerHTML += catalog[k].title;
  bookParent.innerHTML = `${bookParent.innerHTML} by ${catalog[k].author}`;
  bookParent.innerHTML = `${bookParent.innerHTML}<button class="button" id="${k}"> Remove </button>`;
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
  const book = new Book();
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
