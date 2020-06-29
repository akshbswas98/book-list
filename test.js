class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI

class UI {
    static displayBooks() {
     
        let books = store.getBooks();
        books.forEach((book) => {
            UI.addbooktolist(book);
        })
    }
    static addbooktolist(book) {
        const list = document.querySelector("#book-list");
        const tr = document.createElement("tr");
        tr.innerHTML =
            `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#"class= "delete" >X</a></td>
        
        `;

        list.appendChild(tr);

    }

    static clearfields() {
        const form = document.querySelector("#book-form");
        var title1 = form["title"].value = '';
        var author1 = form["author"].value = '';
        var isbn1 = form["isbn"].value = '';

    }
    static deletebooks(e) {
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.parentElement.remove();


        }

    }
    static showalert(message, color) {



        const wrapper = document.querySelector(".wrapper");
        const form = document.querySelector("#book-form");


        const div2 = document.createElement("div");
        div2.classList.add("error");
        div2.textContent = message;
        div2.style.backgroundColor = `${color}`;


        wrapper.insertBefore(div2, form);

        setTimeout(() => {
            document.querySelector('.error').remove();
        }, 2000)


    }
}

//store
class store {

    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));

        }
        return books;

    }

    static addBook(book) {
        const books = store.getBooks();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));

    }

    static removebook(isbn) {
        const books = store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);

            }


        })
        localStorage.setItem("books", JSON.stringify(books));

    }




}




//displaybooks
document.addEventListener("DOMContentLoaded", UI.displayBooks);


//addbooks
const form = document.querySelector("#book-form");



form.addEventListener("submit", (e) => {
    if (form["title"].value === '' || form["author"].value === '' || form["isbn"].value === '') {
        UI.showalert("enter all fields", 'red');
    }
    else {
        e.preventDefault();
        var title1 = form["title"].value;
        var author1 = form["author"].value;
        var isbn1 = form["isbn"].value;

        const book = new Book(title1, author1, isbn1);



        UI.addbooktolist(book);
        store.addBook(book);
        UI.showalert("book added succesfully", '	#32CD32');

        UI.clearfields();
    }


})

//delete books
const list = document.querySelector("#book-list");
list.addEventListener("click", (e) => {


    UI.deletebooks(e);



    store.removebook(e.target.parentElement.previousElementSibling.textContent);
    
    UI.showalert("book deleted succesfully", '	#32CD32');

})



