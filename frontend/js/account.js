document.querySelector('#account').addEventListener("click", async() => {
    console.log("clicked");
    const tbr = await fetchActiveUserTbr()
    const tbrArr = booksArr.filter(book => tbr.map(book => +book.bookId).includes(book.id))   
    books.innerHTML = ""
    books.previousElementSibling.innerText = "TBR"
    renderBooks(tbrArr)
})