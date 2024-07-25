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

for (let i = 0; i < 3; i++) {
    let bookTitle = prompt("Input title of a book:", "Example Title");
    addBookToLibrary(new Book(bookTitle));
}
console.table(myLibrary);