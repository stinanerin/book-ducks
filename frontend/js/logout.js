// ----------------------- LOGOUT USER -----------------------
const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    checkSession()
}

logoutWrapper.querySelector("button").addEventListener("click", logout)
