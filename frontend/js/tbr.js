const updateTbr = async(arr) => {
    try {
        return await axios.put("http://localhost:1337/api/user/me",
            {
                data: {
                    tbr: arr
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
            }
        )
    } catch(err) {
        //todo
        console.log(err);
    }
}
/* Function which is run when the "want to read" btn is clicked */
const addToTbr = async(btn) => {
    const bookID = btn.closest("li").dataset.id
    console.log(bookID);
    const res = await fetchActiveUser()
    console.log(res);
    const tbr = res.data.tbr
    console.log(tbr);
    if(tbr.find(book => book.bookId === bookID)) {
        /* If user were to remove disabled attribute from clicked btn and click again - the btn is remvoed from the DOM  */
        btn.remove()
    } else {
        tbr.push({
            bookId: bookID
        })
        const res = await updateTbr(tbr)
        if(res.status && res.status === 200) {
            btn.innerHTML = `Added <i class="fa-solid fa-check"></i>`
            btn.disabled = true;
        }
    }
}