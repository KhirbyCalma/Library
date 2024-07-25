"use strict";

console.log("Hello world!");

const myLibrary = [];

// Book Constructor
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = this.hasRead;
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
    bookHasRead.setAttribute("checked", book.hasRead);

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookHasRead);

    return bookContainer;
}

const body = document.querySelector('main .books');
// for (let i = 0; i < 3; i++) {
//     let bookTitle = prompt("Input title of a book:", "Example Title");
//     let bookAuthor = prompt("Input author of said book:", "Example Author");
//     let bookPages = prompt("Input amount of pages in said book:", 10);
//     let bookHasRead = prompt("Have you read the book? (yes or no)", "no");
//     addBookToLibrary(new Book(bookTitle, bookAuthor, bookPages, bookHasRead === "yes" ? true : false));
// }

for (const book of myLibrary) {
    body.appendChild(createBookCard(book));
}

const addBookBtn = document.getElementById("add-book");
const addBookModal = document.getElementById("add-book-modal");
const closeBookModalBtn = document.getElementById("close-book-modal");
addBookBtn.addEventListener("click", () => {
    addBookModal.showModal();
});
closeBookModalBtn.addEventListener("click", () => {
    addBookModal.close();
});