// Checks if user already has an ongoin login session
checkSession()
fetchClrTheme()

// ----------------------- HEADER LOGO BUTTON -----------------------
document.querySelector("#startPage").addEventListener("click", () => {
  removeClass([booksWrapper], "hidden")
  addClass([forms], "hidden")
  renderBooks(booksArr, "Books")
})

const fetchActiveUser = async() => {
    try {
        return res = await axios.get("http://localhost:1337/api/users/me?populate=*",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
    } catch(error) {
        // console.log(error);
    }
}
