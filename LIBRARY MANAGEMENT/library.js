let books = JSON.parse(localStorage.getItem("books")) || [];
let editIndex = -1;

function validateBook(title, author, copies) {
    if (!title.trim()) return "Title required";
    if (!author.trim()) return "Author required";
    if (isNaN(copies) || copies <= 0) return "Copies must be greater than 0";
    return null;
}

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let copies = parseInt(document.getElementById("copies").value);

    let error = validateBook(title, author, copies);
    if (error) {
        alert(error);
        return;
    }

    if (editIndex === -1) {
        books.push({ title, author, copies });
    } else {
        books[editIndex] = { title, author, copies };
        editIndex = -1;
    }

    saveBooks();
    renderBooks();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("copies").value = "";
}

function editBook(index) {
    let book = books[index];
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("copies").value = book.copies;
    editIndex = index;
}

function deleteBook(index) {
    books.splice(index, 1);
    saveBooks();
    renderBooks();
}

function renderBooks() {
    let table = document.getElementById("bookTable");
    table.innerHTML = "";

    books.forEach((book, index) => {
        table.innerHTML += `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.copies}</td>
            <td><button class="btn btn-sm btn-info" onclick="editBook(${index})">Edit</button></td>
            <td><button class="btn btn-sm btn-danger" onclick="deleteBook(${index})">Delete</button></td>
        </tr>`;
    });
}

renderBooks();
