
const updateTbr = async(arr) => {
    try {
        const res = await axios.put("http://localhost:1337/api/user/me",
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
        console.log(err);
    }
}

const addToTbr = async(btn) => {
    const bookID = btn.closest("li").dataset.id
    const res = await fetchActiveUser()
    const tbr = res.data.tbr
    if(tbr.find(book => book.bookId === bookID)) {
        /* If user were to remove disabled attribute from clicked btn and click again - the btn is remvoed from the DOM  */
        btn.remove()
    } else {
        tbr.push({
            bookId: bookID
        })
        updateTbr(tbr)
        btn.innerHTML = `Added <i class="fa-solid fa-check"></i>`
        btn.disabled = true;
    }
}