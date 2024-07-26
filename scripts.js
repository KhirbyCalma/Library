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

// CUSTOM FUNCTIONS
// FUNCTION TO CREATE BOOK CARD HTML ELEMENT
function createBookCard(book) {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add("book");
    const bookTitle = document.createElement('h1');
    const bookAuthor = document.createElement('h2');
    const bookPages = document.createElement('p');
    const bookHasReadContainer = document.createElement('div');
    const bookHasReadLabel = document.createElement('label');
    const bookHasReadCheckbox = document.createElement('input');
    bookHasReadLabel.setAttribute("for", "book-has-read-checkbox");
    bookHasReadCheckbox.setAttribute("id", "book-has-read-checkbox");
    bookHasReadCheckbox.setAttribute("type", "checkbox");
    bookHasReadCheckbox.setAttribute("name", "bookHasRead");
    bookHasReadContainer.appendChild(bookHasReadLabel);
    bookHasReadContainer.appendChild(bookHasReadCheckbox)
    const removeBookBtn = document.createElement('button');
    removeBookBtn.textContent = 'Remove';

    bookTitle.textContent = `"${book.title}"`;
    bookAuthor.textContent = book.author;
    bookPages.textContent = `${book.pages} pages`;
    bookHasReadLabel.textContent = "Read?";
    bookHasReadCheckbox.checked = book.hasRead;

    bookHasReadCheckbox.addEventListener("click", () => {
        myLibrary.updateBookReadStatus(book);
        updateBookDisplay();
    });
    removeBookBtn.addEventListener("click", () => {
        myLibrary.removeBook(book);
        updateBookDisplay();
    });

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookHasReadContainer);
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
    console.table(this.books);
}
Library.prototype.removeBook = function(bookToBeRemoved) {
    this.books = this.books.filter((book) => book !== bookToBeRemoved);
    console.table(this.books);
}
Library.prototype.updateBookReadStatus = function(bookToBeUpdatedReadStatus) {
    bookToBeUpdatedReadStatus.hasRead = !bookToBeUpdatedReadStatus.hasRead;
    console.table(this.books);
}
const myLibrary = new Library();

// BOOK OBJECT (ATTRIBUTES)
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}
