const fetchActiveUserTbr = async() => {
    try {
        const res = await axios.get("http://localhost:1337/api/users/me?populate=*",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        return res.data.tbr
    } catch(err) {
        console.log(err);
    }
}
// ctx.request.body.tbr
const updateTbr = async(arr) => {
    // console.log((data: {tbr: arr }));
    try {
        await axios.put("http://localhost:1337/api/user/me",
            {
                data: {
                    tbr: arr
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        ).then((response) => {
            console.log(response);
        })
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
