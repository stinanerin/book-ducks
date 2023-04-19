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
    } catch(error) {
        console.log("Error updating tbr: ", error);
        alert("Failed to update TBR list. Please try again later.")
    }
}

/* Function which is run when the "want to read" btn is clicked */
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
        const res = await updateTbr(tbr)
        if(res && res.status === 200) {
            btn.innerHTML = `Added <i class="fa-solid fa-check"></i>`
            btn.disabled = true;
        }
    }
}