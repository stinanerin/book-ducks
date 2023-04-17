
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
    //todo! Clear user frpm adding mutlitple books til lsit, as to not add data unnecessarily
    const bookID = btn.closest("li").dataset.id
    const res = await fetchActiveUser()
    const tbr = res.data.tbr
    console.log("bookId", bookID, "tbr pre psuh", tbr);
    tbr.push({
        bookId: bookID
    })
    console.log("tbr after push",tbr);
    updateTbr(tbr)
}
