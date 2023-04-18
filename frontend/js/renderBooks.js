const booksWrapper = document.querySelector("#booksWrapper")
const ulRating = booksWrapper.querySelector("#rated")

let booksArr;
let usersRatedBooks;
let tbr;
let ratings;

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

    const h2 = createElement("h2", "my-5")
    h2.innerText = heading
    ul.prepend(h2)

    if(heading === "Rated") {
        renderSelect(arr)
    }

    /* If passed in array contians no books - display message */
    if(arr.length === 0) {
        const p = createElement("p", "my-5 text-center")
        p.innerText = `You have not ${heading === "Rated" ? "rated any books yet." : "added any books to your TBR list yet."}`
        ul.append(p)
        return
    }

    const loggedInUser = sessionStorage.getItem("token") ? true : false

    /* If a user is signed in - fetch their rated books from strapi */
    if(loggedInUser) {
        const res = await fetchActiveUser()
        /* Assings users rated books & tbr books to globally available variables - usersRatedBooks & tbr */
        usersRatedBooks = res.data.ratedBooks
        tbr = res.data.tbr
    }
    
    arr.forEach(({id, attributes: {title, author, release, pages, rating,  cover : {data: {attributes: {url} }}}}) => {
        const li = createElement("li", "col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column justify-content-between p-0")
        li.dataset.id = id
        li.innerHTML  += `
            <div><img src="http://localhost:1337${url}" alt="Boook cover of ${title}"/></div>
            <div class="book-rating my-3"></div>
            <div class="title d-flex justify-content-center align-items-center">
                <h3>${title}</h3>
            </div>
            <h4 class="mt-3">by <i>${author}</i></h4>
            <div class="mt-3 d-flex justify-content-center book-info">
                <div class="d-flex justify-content-between align-items-center">
                    <p><b>${(release.split("-"))[0]}</b></p>
                    <i class="fa-solid fa-circle"></i>
                    <p><b>${pages}</b> pages</p>
                </div>
            </div>
            <div class="d-flex justify-content-center align-items-center mt-3">
                <div class="book-footer" ></div>
                <p class="mx-3"><i class="fa-solid fa-star"></i> <b><span class="rating">${rating.length > 0 ? avgRating(rating) : "0" }</span></b></p>
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

