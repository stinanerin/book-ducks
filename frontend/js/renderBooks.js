const booksWrapper = document.querySelector("#booksWrapper")
const ulRating = booksWrapper.querySelector("#rated")

let booksArr;
let usersRatedBooks;
let tbr;

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
        /* Assings users rated books to globally available variable - usersRatedBooks */
        usersRatedBooks = res.data.ratedBooks
        //! nytt
        tbr = res.data.tbr
        console.log("tbr", tbr);
    }
    
    arr.forEach(({id, attributes: {title, author, release, pages, rating,  cover : {data: {attributes: {url} }}}}) => {
        const li = document.createElement("li")
        li.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column justify-content-between";
        li.dataset.id = id
        li.innerHTML  += `
            <div><img class="img-fluid p-2" src="http://localhost:1337${url}" alt="Boook cover of ${title}"/></div>
            <div class="book-rating pb-3"></div>
            <div class="title d-flex justify-content-center align-items-center">
                <h3>${title} </h3>
            </div>
            <h4 class="pt-3">by <i>${author}</i></h4>
            <p class="pt-3"><b>Published:</b> ${release}</p>
            <p class="pt-3"><b>${pages}</b> pages</p>
            <div class="d-flex justify-content-center align-items-center pt-3">
                <div class="book-footer" ></div>
                <p class="rating px-3"><i class="fa-solid fa-star"></i> <b>${rating.length > 0 ? avgRating(rating) : "0" }</b></p>
            </div>
        `
        ul.append(li)

        // todo bryt ut?
        /* If user is logged in - renders stars & tbr btn */
        if(loggedInUser) {
            li.querySelector(".book-rating").innerHTML = `
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
            </label>`
            /* Apply eventlisteners to stars --> updates API*/
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

            /* If user has already rated book - do not render tbr btn  */
            if(!tbr.find(book => +book.bookId === id)) {
                li.querySelector(".book-footer").innerHTML = `<button class="btn secondary-btn" onclick="addToTbr(this)">Want to read <i class="fa-solid fa-plus"></i></button>`
            } 
        }
    })
}

const fetchBooks = async() => {
    try {
        const res = await axios.get("http://localhost:1337/api/books?populate=*")
        /* Assings strapi bookArr to globally available variable */
        booksArr = res.data.data
        renderBooks(booksArr, "Books")
    } catch(err) {
        //todo
        console.log(err);
    }
}

