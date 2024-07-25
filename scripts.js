"use strict";

console.log("Hello world!");

const myLibrary = [];

// Book Constructor
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

// Adds book object to library array
function addBookToLibrary(book) {
    myLibrary.push(book);
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
    addBookToLibrary();
    addBookModal.close();
    addBookForm.reset();
    booksContainer.appendChild(createBookCard(book));
});
closeBookModalBtn.addEventListener("click", () => {
    addBookForm.reset();
    addBookModal.close();
});