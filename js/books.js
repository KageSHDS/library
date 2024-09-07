// const books = JSON.parse(localStorage.getItem('books')) || [];

// // const book = {};
// // book.title = "Frontend для чайников";
// // book.author = "John White";
// // book.year = 2022;
// // book.genre = "Техническая литература";
// // book.status = "прочитано";

// // books.push(book);
// // books.push(book);
// // books.push(book);
// // books.push(book);
// // books.push(book);
// // books.push(book);


// const book_list = document.getElementById('list_books');

// displayBooks();

// function indexBook(book) {
//     const bookNumber = books.indexOf(book);
//     return bookNumber;
// }

// function displayBooks(){
//     book_list.innerHTML = ``;
//     books.forEach(displayBook);
// };

// function saveBooks(){
//     localStorage.setItem('books', JSON.stringify(books));
// }

// function displayBook(book){
//     const bookNumber = books.indexOf(book);
//     book_list.innerHTML += `
//     <div class="book">
//         <h2>${book.title}</h2>
//         <p>${book.author}</p>
//         <p>${book.year}</p>
//         <p>${book.genre}</p>
//         <p>${book.status}</p>
//         <button onclick = "deleteBook(${bookNumber})">Удалить</button>
//         <button onclick = "changeBook(${bookNumber})">Изменить</button>
//     </div>
//     `
// }

// function addBook() {
//     const book = {};
// 	book.title = document.getElementById('title').value;
// 	book.author = document.getElementById('author').value;
// 	book.year = document.getElementById('years').value;
// 	book.genre = document.getElementById('genre').value;
// 	book.status = document.getElementById('status').value;
//     // console.log(indexBook(book));
//     document.forms[0].reset()
//     // books[0] = book
//     books.push(book);
//     displayBooks();
//     saveBooks();
//     return false;
// }

// function deleteBook(bookNumber) {
//     books.splice(bookNumber, 1);
//     saveBooks();
//     displayBooks();
// }

// function changeBook(bookNumber) {
//     document.forms[0].reset();
//     const book = books[bookNumber];
// 	document.getElementById('title').value = book.title;
// 	document.getElementById('author').value = book.author;
// 	document.getElementById('years').value = book.year;
// 	document.getElementById('genre').value = book.genre;
// 	document.getElementById('status').value = book.status;
//     console.log(bookNumber);
//     saveBooks();
//     displayBooks();
// }

// function appleChangeBook(){
//     console.log("worked");
//     const book = {};
// 	book.title = document.getElementById('title').value;
// 	book.author = document.getElementById('author').value;
// 	book.year = document.getElementById('years').value;
// 	book.genre = document.getElementById('genre').value;
// 	book.status = document.getElementById('status').value;
//     books[1] = book;
//     saveBooks();
//     displayBooks();
//     return false;
// }

// let text;
// function quantityBook() {
//     text = document.getElementById('footer_number');
//     text.textContent = `кол-во книг: ${books.length}`
//     return text;
// }
// quantityBook();


function uploadPage() {
    window.location.reload();
}

function deletedAllBook(){
    books.length = 0;
    saveToLocalStorage();
	displayBook();
};

let currentEditItem = null;
let books = JSON.parse(localStorage.getItem('books')) || []

function saveToLocalStorage() {
	localStorage.setItem('books', JSON.stringify(books));
};

function displayBook() {
	const list = document.getElementById('list_books');
    const filterStatus = document.getElementById("filterStatus").value;
	list.innerHTML = '';
    
	books.forEach((book, index) => {
        if(filterStatus === "All" || book.status === filterStatus){
		    const listItem = document.createElement('li');
		    const bookDiv = document.createElement('div');
		    bookDiv.classList.add('bookItem');

		    const titleText = document.createElement('div');
		    titleText.classList.add('title');
		    titleText.textContent = `Title: ${book.title}`;

		    const authorText = document.createElement('div');
		    authorText.classList.add('author');
		    authorText.textContent = `Author: ${book.author}`;

		    const yearText = document.createElement('div');
		    yearText.classList.add('year');
		    yearText.textContent = `year: ${book.year}`;

		    const genreText = document.createElement('div');
		    genreText.classList.add('genre');
		    genreText.textContent = `genre: ${book.genre}`;

		    const statusText = document.createElement('div');
		    statusText.classList.add('status');
		    statusText.textContent = `status: ${book.status}`;

		    const editBook = document.createElement('button');
		    editBook.textContent = 'Изменить';
		    editBook.addEventListener('click', function () {
			    currentEditItem = index;
			    document.getElementById('title').value = book.title;
			    document.getElementById('author').value = book.author;
			    document.getElementById('year').value = book.year;
			    document.getElementById('genre').value = book.genre;
			    document.getElementById('status').value = book.status;
		    });

		    const deleteBook = document.createElement('button');
		    deleteBook.textContent = 'Удалить';
		    deleteBook.addEventListener('click', function () {
			    books.splice(index, 1);
			    saveToLocalStorage();
			    displayBook();
		    });

		    bookDiv.appendChild(titleText);
		    bookDiv.appendChild(authorText);
            bookDiv.appendChild(yearText);
            bookDiv.appendChild(genreText);
            bookDiv.appendChild(statusText);
            bookDiv.appendChild(editBook);
		    bookDiv.appendChild(deleteBook);
		    listItem.appendChild(bookDiv);
		    list.appendChild(listItem);
        }
	});
}

document.getElementById('add_form').addEventListener('submit', function (event) {
		
        event.preventDefault();

		const title = document.getElementById('title').value;
		const author = document.getElementById('author').value;
		const year = document.getElementById('year').value;
		const genre = document.getElementById('genre').value;
		const status = document.getElementById('status').value;

		const book = { title, author, year, genre, status };

		if (currentEditItem !== null) {
			books[currentEditItem] = book;
			currentEditItem = null;
		} else {
			books.push(book);
		}

		saveToLocalStorage();
		displayBook();

		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('year').value = '';
		document.getElementById('genre').value = '';
		document.getElementById('status').value = 'unread';
	});

displayBook();


let text
function quantityBook() {
	text = document.getElementById('footer_number');
	text.textContent = `кол-во книг: ${books.length}`;
}
quantityBook()


// function deletedAllBook() {
// 	books.length = 0
// 	saveToLocalStorage()
// 	displayBook()
// }
