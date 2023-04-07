document.querySelector('#account').addEventListener("click", async() => {
    if(sessionStorage.getItem("token")) {
        console.log("clicked");
        const tbr = await fetchActiveUserTbr()
        console.log(tbr);
        const tbrArr = booksArr.filter(book => tbr.map(book => +book.bookId).includes(book.id))   
        renderBooks(tbrArr, "TBR")
    } else {
        removeClass([forms], "hidden")
    }
})