document.querySelector('#account').addEventListener("click", async() => {
    console.log("clicked");
    const tbr = await fetchActiveUserTbr()
    console.log(tbr);
    const tbrArr = booksArr.filter(book => tbr.map(book => +book.bookId).includes(book.id))   
    renderBooks(tbrArr, "TBR")
})