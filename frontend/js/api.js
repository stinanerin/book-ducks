const fetchBooks = async() => {

    try {
        const res = await axios.get("http://localhost:1337/api/books?populate=*")
        console.log(res);
        let { data: booksArr } = res.data;

    } catch(err) {
        console.log(err);
    }

}

fetchBooks()