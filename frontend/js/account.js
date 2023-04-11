const booksWrapper = document.querySelector("#booksWrapper")

// ----------------------- ACCOUNT ICON -----------------------

document.querySelector('#account').addEventListener("click", async() => {
    if(sessionStorage.getItem("token")) {
        /* If a user is signed in - fetch users TBR-list of book IDs */
        const res = await fetchActiveUser()
        const tbr = res.data.tbr
        if(tbr.length == 0) {
            //todo! Add display
            console.log("you have no books");
        }
        /* Filter global booksArr for the users tbr books IDs --> Render them */
        const tbrArr = booksArr.filter(book => tbr.map(book => +book.bookId).includes(book.id))   
        renderBooks(tbrArr, "TBR")
    } else {
        addClass([booksWrapper], "hidden")
        removeClass([forms], "hidden")
    }
})