const myLibrary = [];
function setupBookContainer() {
    const bookContainer = document.querySelector('.books-container');
    bookContainer.addEventListener('click', (e) => {
        const index = parseInt(e.target.parentElement.dataset.index);
        if(e.target.className === 'book-delete-button') {
            myLibrary.splice(index, 1);
            displayBooks();
        }
        else if(e.target.classList.contains('book-read-tag')) {
            console.log('here')
            myLibrary[index].toggleRead();
            displayBooks();
        }
    });
}
function setupDialog() {
    const dialog = document.querySelector("dialog");
    const openDialogButton = document.querySelector(".add-book-button");
    const form = document.querySelector('form');
    openDialogButton.addEventListener('click', () => {
        dialog.showModal();
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(dialog.returnValue == 'cancel') {
            form.reset();
            return;
        }
        addBookToLibrary(form);
        displayBooks();
        form.reset();
        dialog.close();
    })
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.toggleRead = function() {
    if(this.read == 'read') {
        this.read = 'not read';
    }
    else {
        this.read = 'read'
    }
}
function addBookToLibrary() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('input[name="read"]:checked').value;
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}
function displayBooks() {
    const fragment = document.createDocumentFragment();
    for (const [index, book] of myLibrary.entries()) {
        const bookElement = createBookElement(index, book);
        fragment.appendChild(bookElement);
    }
    const bookContainer = document.querySelector('.books-container');
    bookContainer.innerHTML = '';
    bookContainer.appendChild(fragment);
}
function createBookElement(index, book) {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.dataset.index = index;
    bookDiv.innerHTML =
    `
        <h2 class="book-title"></h2>
        <button class="book-delete-button">Delete</button>
        <h3 class="book-author"><i>By: </i></h3>
        <p class="book-pages">Pages: </p>
        <button class="book-read-tag"></button>
    `
    bookDiv.querySelector('.book-title').textContent = book.title;
    bookDiv.querySelector('.book-author > i').appendChild(document.createTextNode(book.author));
    bookDiv.querySelector('.book-pages').appendChild(document.createTextNode(book.pages));
    const readElement = bookDiv.querySelector('.book-read-tag');
    readElement.textContent = book.read;
    readElement.classList.add(book.read.replace(' ', '-'));
    return bookDiv;
}
setupBookContainer()
setupDialog();