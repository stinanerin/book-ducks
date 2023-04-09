const booksWrapper = document.querySelector("#booksWrapper")

// ----------------------- ACCOUNT ICON -----------------------

document.querySelector('#account').addEventListener("click", async() => {
    if(sessionStorage.getItem("token")) {
        const res = await fetchActiveUser()
        const tbr = res.data.tbr
        if(tbr.length == 0) {
            console.log("you have no books");
        }
        const tbrArr = booksArr.filter(book => tbr.map(book => +book.bookId).includes(book.id))   
        renderBooks(tbrArr, "TBR")
    } else {
        addClass([booksWrapper], "hidden")
        removeClass([forms], "hidden")
    }
})