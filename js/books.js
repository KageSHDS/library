
function uploadPage() { //* функция позволяющая обновить страницу
    window.location.reload();
}

function deletedAllBook() { //* функция которая удаляет полностью все книги на странице 
    books.length = 0;
    saveToLocalStorage();
	displayBook();
};

let currentEditItem = null;
let books = JSON.parse(localStorage.getItem('books')) || []      

function saveToLocalStorage() { //* сохраняем данные в local storage, для того чтобы данные после обновления страницы сохранялись 
	localStorage.setItem('books', JSON.stringify(books));
};

function displayBook() { //* функция для вывода книг на экран
	const list = document.getElementById('list_books');  //* присваиваем list объект list_books
    const filterStatus = document.getElementById("filterStatus").value; //* создаём переменную для проверки статуса фильтра
	list.innerHTML = '';
    
	books.forEach((book, index) => { //* перебираем каждый элемент
        if(filterStatus === "All" || book.status === filterStatus){ //* проверка фильтра статуса 
		    const listItem = document.createElement('li'); //* создаём переменные для занесения данных введенных параметров
		    const bookDiv = document.createElement('div');
		    bookDiv.classList.add('bookItem');

		    const titleText = document.createElement('div');
		    titleText.classList.add('title');
		    titleText.textContent = `Название: ${book.title}`

		    const authorText = document.createElement('div');
		    authorText.classList.add('author');
		    authorText.textContent = `Автор: ${book.author}`

		    const yearText = document.createElement('div');
		    yearText.classList.add('year');
		    yearText.textContent = `Год: ${book.year}`

		    const genreText = document.createElement('div');
		    genreText.classList.add('genre');
		    genreText.textContent = `Жанр: ${book.genre}`

		    const statusText = document.createElement('div');
		    statusText.classList.add('status');
		    statusText.textContent = `Статус: ${book.status}`;

		    const editBook = document.createElement('button');
		    editBook.textContent = 'Изменить';
		    editBook.addEventListener('click', function () {  //* создаём обработчик событий на кнопке изменить 
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

		    bookDiv.appendChild(titleText); //* добавляем значения и заносим их в список
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

document.getElementById('add_form').addEventListener('submit', function (event) { //* добавление книг
		
        event.preventDefault();

		const title = document.getElementById('title').value; //* фиксируем введенные значения
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

		document.getElementById('title').value = ''; //* обнуляем значения 
		document.getElementById('author').value = '';
		document.getElementById('year').value = '';
		document.getElementById('genre').value = '';
		document.getElementById('status').value = 'Не прочитано';
	});

displayBook();


let text
function quantityBook() { //* показывает кол-во книг на странице
	text = document.getElementById('footer_number');
	text.textContent = `кол-во книг: ${books.length}`;
}
quantityBook()


// function deletedAllBook() {
// 	books.length = 0
// 	saveToLocalStorage()
// 	displayBook()
// }
