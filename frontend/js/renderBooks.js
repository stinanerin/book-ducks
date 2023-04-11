const books = document.querySelector('#books');
let booksArr;
let usersRatedBooks;

const renderBooks = async(arr, heading) => {
    books.innerHTML = ""
    books.previousElementSibling.innerText = heading

    /* If a user is signed in - fetch their rated books from strapi */
    if(sessionStorage.getItem("token")) {
        const res = await fetchActiveUser()
        usersRatedBooks = res.data.ratedBooks
    }
    
    arr.forEach(({id, attributes: {title, author, release, pages, rating,  cover : {data: {attributes: {url} }}}}, index) => {
        
        const li = document.createElement("li")
        li.className = "col-6 col-md-4 col-lg-3 ";
        li.dataset.id = id
        li.innerHTML  += `
            <img class="img-fluid p-2" src="http://localhost:1337${url}" alt="Boook cover of ${title}"/>
            <div class="book-rating">
                <label>
                    <input type="radio" name="rate" value="1">
                </label>
                <label>
                    <input type="radio" name="rate" value="2">
                </label>
                <label>
                    <input type="radio" name="rate"  value="3">
                </label>
                <label>
                    <input type="radio" name="rate"  value="4">
                </label>
                <label>
                    <input type="radio" name="rate" value="5">
                </label>
            </div>
            <h2>${title} </h2>
            <h3>${author}</h3>
            <p><b>Published:</b> ${release}</p>
            <p><b>Length:</b> ${pages} pages</p>
            <p>${rating.length > 0 ? "<b>Rating: </b>" + avgRating(rating.map(rate => rate.rating)) : "" } </p>
            <button class="btn" onclick="addToTbr(this)">+</button>
        `

        /* If bookId in userRatedBooks match the currently rendered book's id --> match */
        if(usersRatedBooks && usersRatedBooks.find((book) => +book.bookId === id)) {
            const book = usersRatedBooks.find((book) => +book.bookId === id)
            const stars = li.querySelectorAll("input[name='rate']")
            activateStarsUpToIndex(--book.rating, stars)
        }
        /* Applies eventlisteners to stars */
        starRating(li)
        books.append(li)
    })
}

const fetchBooks = async() => {
    try {
        const res = await axios.get("http://localhost:1337/api/books?populate=*")
        /* Assings strapi bookArr to globally available variable */
        booksArr = res.data.data
        renderBooks(booksArr, "Books")
    } catch(err) {
        console.log(err);
    }
}

// ----------------------- HEADER LOGO BUTTON -----------------------
document.querySelector("#startPage").addEventListener("click", () => {
    removeClass([booksWrapper], "hidden")
    addClass([forms], "hidden")
    renderBooks(booksArr, "Books")
})

