let myLibrary = [];
const newButton = document.getElementById("newBook");

function loadStorage() {
    if (localStorage.getItem('myLibrary') && localStorage.getItem('myLibrary') !== '[]') {
        retrievedData = localStorage.getItem('myLibrary');
        myLibrary = JSON.parse(retrievedData);
        render();
    } 
}

function updateStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    console.log(localStorage);
}

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function() {
        console.log(`${title} by ${author}, ${pages} pages, ${read}`)
    }
}

function addBooktoLibrary(object) {
    myLibrary.push(object);
}

book_1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
book_2 = new Book("East of Eden", "John Steinbeck", 373, true);

addBooktoLibrary(book_1);
addBooktoLibrary(book_2);

newButton.addEventListener("click", () => {
    title = prompt("Enter a title");
    author = prompt("Enter author");
    pages = prompt("Enter # of pages");
    readYet = prompt("Have you read this yet?");
    let read = false;

    if (readYet == "yes" || readYet == "Yes") {
        read = true;
    }

    let book = new Book(title, author, pages, read);
    addBooktoLibrary(book);
    renderMe();
})

function renderMe() {
    var books = document.querySelector('#books');
    books.innerHTML = '';
    for (let num in myLibrary) {
        books.innerHTML
            += `
            <div class='book-card'>
                <p class='title'>${myLibrary[num].title}</p>
                <p class='author'>${myLibrary[num].author}</p>
                    <p class='pages'>${myLibrary[num].pages} pages</p>

            <div class='bookButtons'>
                <button class="readButton" onclick='toggleRead(${num})'>
                    ${myLibrary[num].read === false ? 'Not Read' : 'Read'}
                </button>
                <button class="deleteButton" onclick='removeBook(${num})'>
                    Delete
                </button>
            </div>
        </div>
        `;
    }
}

renderMe();

function toggleRead(position) {
    myLibrary[position].read = !(myLibrary[position].read);
    renderMe();
}

function removeBook(position) {
    myLibrary.splice(position, 1);
    renderMe();
}
