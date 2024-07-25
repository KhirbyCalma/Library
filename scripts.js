"use strict";
function Library() {
    this.books = [];
} 
Library.prototype.addBook = function(book) {
    this.books.push(book);
}
const myLibrary = new Library();

// Book Constructor
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function createBookCard(book) {
    const bookContainer = document.createElement('div');
    const bookTitle = document.createElement('h1');
    const bookAuthor = document.createElement('h2');
    const bookPages = document.createElement('p');
    const bookHasRead = document.createElement('input');
    bookHasRead.setAttribute("type", "checkbox");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookHasRead.checked = book.hasRead;

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookHasRead);

    return bookContainer;
}

function updateBookDisplay() {
    booksContainer.innerHTML = '';
    for (let book of myLibrary.books) {
        booksContainer.appendChild(createBookCard(book));
    }
}

const booksContainer = document.querySelector('main .books');
const addBookBtn = document.getElementById("add-book");
const addBookModal = document.getElementById("add-book-modal");
const addBookForm = document.getElementById("book-form");
const closeBookModalBtn = document.getElementById("close-book-modal");
addBookBtn.addEventListener("click", () => {
    addBookModal.showModal();
});
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const bookData = Object.fromEntries(new FormData(addBookForm));
    const book = new Book(bookData.bookTitle, bookData.bookAuthor, bookData.bookPages, "bookHasRead" in bookData ? true : false);
    myLibrary.addBook(book);
    updateBookDisplay();
    addBookModal.close();
    addBookForm.reset();
    
});
closeBookModalBtn.addEventListener("click", () => {
    addBookForm.reset();
    addBookModal.close();
});