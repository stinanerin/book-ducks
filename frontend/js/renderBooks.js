const books = document.querySelector('#books');

const fetchBooks = async() => {

    try {
        const res = await axios.get("http://localhost:1337/api/books?populate=*")
        console.log(res);
        let { data: booksArr } = res.data;

        //! break out as function
        console.log(booksArr);
        booksArr.forEach(({attributes: {title, author, release, pages,  cover : {data: {attributes: {url} }}}}) => {
            const li = document.createElement("li")
            addClass([li], "col-6 col-md-4 col-lg-3")
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
            `
            rating(li)
            books.append(li)
        })

    } catch(err) {
        console.log(err);
    }
}

fetchBooks()