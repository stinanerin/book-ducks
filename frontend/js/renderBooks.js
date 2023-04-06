const books = document.querySelector('#books');

const fetchBooks = async() => {

    try {
        const res = await axios.get("http://localhost:1337/api/books?populate=*")
        console.log(res);
        let { data: booksArr } = res.data;

        //! break out as function
        console.log(booksArr);
        booksArr.forEach(({attributes: {title, author, release, pages,  cover : {data: {attributes: {url} }}}}) => {
            books.innerHTML  += `
            <li class="col-6 col-md-4 col-lg-3 ">
                <img class="img-fluid p-2" src="http://localhost:1337${url}" alt="Boook cover of ${title}"/>
                <div class="book-rating">
                    <input type="radio" name="rate" id="five" value="5">
                    <label for="five"></label>
                    <input type="radio" name="rate" id="four" value="4">
                    <label for="four"></label>
                    <input type="radio" name="rate" id="three" value="3">
                    <label for="three"></label>
                    <input type="radio" name="rate" id="two" value="2">
                    <label for="two"></label>
                    <input type="radio" name="rate" id="one" value="1">
                    <label for="one"></label>
                </div>
                <h2>${title} </h2>
                <h3>${author}</h3>
                <p>Published: ${release}</p>
                <p>Length: ${pages} pages</p>
            </li>
            `
        })

    } catch(err) {
        console.log(err);
    }

}

fetchBooks()