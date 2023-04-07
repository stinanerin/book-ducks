const books = document.querySelector('#books');
let booksArr;

const renderBooks = (arr, heading) => {
    books.innerHTML = ""
    books.previousElementSibling.innerText = heading
    
    console.log(arr);
    arr.forEach(({id, attributes: {title, author, release, pages,  cover : {data: {attributes: {url} }}}}) => {
        const li = document.createElement("li")
        addClass([li], "col-6 col-md-4 col-lg-3 ")
        li.dataset.id = id

        li.innerHTML  += `
            <img class="img-fluid p-2" src="http://localhost:1337${url}" alt="Boook cover of ${title}"/>
            <div class="book-rating">
                <label class="active">
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
            <p>Published: ${release}</p>
            <p>Length: ${pages} pages</p>
            <button class="btn" onclick="addToTbr(this)">+</button>
        `
        rating(li)
        books.append(li)
    })
}

const fetchBooks = async() => {
    try {
        const res = await axios.get("http://localhost:1337/api/books?populate=*")

        // Assings strapi bookArr to globally available variable
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
