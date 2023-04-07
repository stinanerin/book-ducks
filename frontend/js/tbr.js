const fetchActiveUserTbr = async() => {
    try {
        const res = await axios.get("http://localhost:1337/api/users/me?populate=*",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        return res.data.tbr
    } catch(err) {
        console.log(err);
    }
}

const updateTbr = async(arr) => {
    try {
        const res = await axios.put("http://localhost:1337/api/user/me",
        {
            tbr: arr
        },
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        }
        );
    } catch(err) {
        console.log(err);
    }
}

const addToTbr = async(btn) => {
    const bookID = btn.parentElement.dataset.id
    const tbr = await fetchActiveUserTbr()
    console.log("bookId", bookID, "tbr pre psuh", tbr);
    tbr.push(
        {
            bookId: bookID,
        }
    )
    console.log("tbr after push",tbr);
    updateTbr(tbr)
}
