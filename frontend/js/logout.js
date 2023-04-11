// ----------------------- LOGOUT USER -----------------------
const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userId");
    checkSession()
    renderBooks(booksArr)
}

logoutWrapper.querySelector("button").addEventListener("click", logout)
