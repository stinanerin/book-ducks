// ----------------------- LOGOUT USER -----------------------
const logout = () => {
    console.log("logout");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    checkSession()
}

document.querySelector("#logout").addEventListener("click", logout)
