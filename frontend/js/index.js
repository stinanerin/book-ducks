// Checks if user already has an ongoin login session
checkSession()
fetchClrTheme()

const fetchActiveUser = async() => {
    //todo! Add params
    try {
        const res = await axios.get("http://localhost:1337/api/users/me?populate=*",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        return res
    } catch(err) {
        console.log(err);
    }
}

// ----------------------- HEADER LOGO BUTTON -----------------------
document.querySelector("#startPage").addEventListener("click", () => {
  removeClass([booksWrapper], "hidden")
  addClass([forms], "hidden")
  renderBooks(booksArr, "Books")
  clearElem([sortingDiv])
})