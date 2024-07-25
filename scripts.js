"use strict";

console.log("Hello world!");

const myLibrary = [];

// Book Constructor
function Book(title) {
    this.title = title;
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