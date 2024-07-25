"use strict";
// QUERY SELECTORS
const booksContainer = document.querySelector('main .books');
const addBookBtn = document.getElementById("add-book");
const addBookModal = document.getElementById("add-book-modal");
const addBookForm = document.getElementById("book-form");
const closeBookModalBtn = document.getElementById("close-book-modal");

// EVENT LISTENERS
addBookBtn.addEventListener("click", () => {
    addBookModal.showModal();
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const bookData = Object.fromEntries(new FormData(addBookForm));
    const book = new Book(generateUUID(), bookData.bookTitle, bookData.bookAuthor, bookData.bookPages, "bookHasRead" in bookData ? true : false);
    myLibrary.addBook(book);
    updateBookDisplay();
    addBookModal.close();
    addBookForm.reset();
    console.log(myLibrary.books);
});

closeBookModalBtn.addEventListener("click", () => {
    addBookForm.reset();
    addBookModal.close();
});

// CUSTOM FUNCTIONS
function generateUUID() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

// FUNCTION TO CREATE BOOK CARD HTML ELEMENT
function createBookCard(book) {
    const bookContainer = document.createElement('div');
    const bookTitle = document.createElement('h1');
    const bookAuthor = document.createElement('h2');
    const bookPages = document.createElement('p');
    const bookHasRead = document.createElement('input');
    bookHasRead.setAttribute("type", "checkbox");
    const removeBookBtn = document.createElement('button');
    removeBookBtn.textContent = 'Remove';

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookHasRead.checked = book.hasRead;
    removeBookBtn.addEventListener("click", () => {
        myLibrary.removeBookByUUID(book.uuid);
        updateBookDisplay();
    });

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookHasRead);
    bookContainer.appendChild(removeBookBtn);

    return bookContainer;
}

// FUNCTION TO UPDATE BOOK DISPLAY WHENEVER CHANGES MADE TO LIBRARY'S BOOKS
function updateBookDisplay() {
    booksContainer.innerHTML = '';
    for (let book of myLibrary.books) {
        booksContainer.appendChild(createBookCard(book));
    }
}

// CUSTOM OBJECTS
// LIBRARY OBJECT (ATTRIBUTES AND METHODS)
function Library() {
    this.books = [];
} 
Library.prototype.addBook = function(book) {
    this.books.push(book);
}
Library.prototype.removeBookByUUID = function(bookUUID) {
    this.books = this.books.filter((book) => book.uuid !== bookUUID);
}
const myLibrary = new Library();

// BOOK OBJECT (ATTRIBUTES)
function Book(uuid, title, author, pages, hasRead) {
    this.uuid = uuid;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}
