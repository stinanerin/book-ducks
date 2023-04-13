const booksWrapper = document.querySelector("#booksWrapper")
const ulRating = booksWrapper.querySelector("#rated")

let booksArr;
let usersRatedBooks;

/**
* @param {array} arr - strapi array of book objects
* @param {string} heading - the heading for the book list
* @param {number} ul - the ul the book list should be appended in
*/ 

const renderBooks = async(arr, heading, ul) => {
    if(!ul) {
        ul = document.querySelector('#books');
    }

    ul.innerHTML = ""
    ulRating.innerHTML = ""

    const h2 = document.createElement("h2")
    h2.innerText = heading
    ul.prepend(h2)

    const loggedInUser = sessionStorage.getItem("token") ? true : false

    /* If a user is signed in - fetch their rated books from strapi */
    if(loggedInUser) {
        const res = await fetchActiveUser()
        usersRatedBooks = res.data.ratedBooks
    }
    
    arr.forEach(({id, attributes: {title, author, release, pages, rating,  cover : {data: {attributes: {url} }}}}) => {
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
            <h3>${title} </h3>
            <h4>${author}</h4>
            <p><b>Published:</b> ${release}</p>
            <p><b>Length:</b> ${pages} pages</p>
            <p class="rating">${rating.length > 0 ? "<b>Rating: </b>" + avgRating(rating) : "" } </p>
            <button class="btn" onclick="addToTbr(this)">+</button>
        `

        /* If user is logged in - apply eventlisteners to stars */
        if(loggedInUser) {
            starRating(li)
            /* 
                If bookId in userRatedBooks match the currently rendered book's id --> 
                color stars according to users rating 
            */
            if(usersRatedBooks && usersRatedBooks.find((book) => +book.bookId === id)) {
                const book = usersRatedBooks.find((book) => +book.bookId === id)
                const stars = li.querySelectorAll("input[name='rate']")
                activateStarsUpToIndex(--book.rating, stars)
            }
        }

        ul.append(li)
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

