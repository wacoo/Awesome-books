/* eslint-disable max-classes-per-file */
const form = document.getElementById('frm_books');
const display = document.getElementById('display');
const infoDisplay = document.querySelector('small');

let catalog = null;
let i = 0;

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Catalog {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(bId) {
    this.books = this.books.filter((book) => book.id !== bId);
  }

  addRemoveListener(idx) {
    const remove = document.getElementById(idx);
    if (remove) {
      remove.addEventListener('click', (event) => {
        const button = event.target;
        const parent = button.parentNode;
        parent.parentNode.removeChild(parent);
        this.removeBook(idx);
        this.saveBooks();
        if (i > 0) {
          i -= 1;
        }
      });
    }
  }

  showAll() {
    return this.books;
  }

  displayData(idx) {
    const bookParent = document.createElement('div');
    bookParent.classList.add(`parent-${idx}`);
    bookParent.classList.add('book-parent');
    bookParent.innerHTML += this.books[idx].title;
    bookParent.innerHTML = `${bookParent.innerHTML} by ${this.books[idx].author}`;
    bookParent.innerHTML = `${bookParent.innerHTML}<button class="button" id="${idx}"> Remove </button>`;
    display.appendChild(bookParent);
    this.addRemoveListener(idx);
  }

  getDataForm() {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const book = new Book();
      book.id = i;
      book.title = form.elements.title.value;
      book.author = form.elements.author.value;
      form.elements.title.value = '';
      form.elements.author.value = '';
      catalog.addBook(book);
      this.displayData(i);
      this.saveBooks();
      infoDisplay.innerHTML = 'Book added successfully!';
      infoDisplay.classList.add('success');
      i += 1;
    });
  }

  saveBooks() {
    const strData = JSON.stringify(this.books);
    localStorage.setItem('data', strData);
  }

  restoreBooks() {
    let data = localStorage.getItem('data');
    if (!data) {
      data = {};
    } else {
      const objData = JSON.parse(data);
      this.books = objData;
    }
  }

  displayStorage() {
    for (let i = 0; i < this.books.length; i += 1) {
      this.displayData(i);
    }
  }
}

catalog = new Catalog();
catalog.getDataForm();
catalog.restoreBooks();
catalog.displayStorage();