
// ----------------------- ACCOUNT ICON -----------------------
document.querySelector('#account').addEventListener("click", async() => {
    //todo bryt ut
    if(sessionStorage.getItem("token")) {
        /* If a user is signed in - fetch users TBR-list of book IDs */
        const res = await fetchActiveUser()
        ratings = res.data.ratedBooks
        /* Could use global tbr array, but since I have to fetch the ratings, I can do this as well for now */
        tbr = res.data.tbr
    
        /* Filter global booksArr for the users tbr books IDs - then renders them */
        //todo break out filter function
        const tbrArr = booksArr.filter(book => tbr.map(book => +book.bookId).includes(book.id))   
        renderBooks(tbrArr, "TBR")
        ratedBooks = booksArr.filter(book => ratings.map(book => +book.bookId).includes(book.id))   
        renderBooks(ratedBooks, "Rated", ulRating)
    
    } else {
        addClass([booksWrapper], "hidden")
        removeClass([forms], "hidden")
    }
})
