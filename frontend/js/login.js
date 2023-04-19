const forms  = document.querySelector('#formWrapper'),
    loginLink  = document.querySelector('#loginLink'),
    registerLink  = document.querySelector('#registerLink'),
    loginContainer =  document.querySelector("#loginWrapper"),
    loginAlert =  document.querySelector("#login-alert-container"),
    registerAlert =  document.querySelector("#registerAlertContainer"),
    registerContainer = document.querySelector("#registerWrapper"),
    registerUserForm = document.querySelector("#registerUser"),
    feedback = document.querySelector("#feedback"),
    userNameDisplay = document.querySelector("#userName"),
    loginEmail = document.querySelector("#loginEmail"), 
    loginPwd = document.querySelector("#loginPWD"),
    username = document.querySelector("#fullName"),
    email = document.querySelector("#email"), 
    pwd = document.querySelector("#pwd"),
    confPwd = document.querySelector("#pwdConf"),
    passwordAlert = document.querySelector("#passwordAlert"),
    logoutWrapper = document.querySelector("#logout"),
    formHelpers = document.querySelectorAll(".form-text");

// ----------------------- TOGGLE BETWEEN REGISTER / LOGIN VIEW -----------------------
loginLink.addEventListener("click", () => { toggleClass([registerContainer, loginContainer], "hidden") })
registerLink.addEventListener("click", () => { toggleClass([registerContainer, loginContainer], "hidden") })

// ----------------------- LOGIN FORM -----------------------
document.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault()

    removeClass([loginEmail, loginPwd], "error");
    login()
})

// ----------------------- LOGIN USER AGAINST STRAPI -----------------------
const login = async() => {

    try {
        const res = await axios.post("http://localhost:1337/api/auth/local", {
            identifier: loginEmail.value,
            password: loginPwd.value,
        })
        clearValue([loginEmail, loginPwd])
        clearElem([loginAlert])
        addSession(res)

    } catch(error) {
        displayError(loginAlert, error)
        addClass([loginEmail, loginPwd], "error");
    }
}

// ----------------------- ADD USER TO SESSION STORAGE -----------------------
const addSession = (res) => {
    sessionStorage.setItem("token", res.data.jwt);
    sessionStorage.setItem("user", res.data.user.username);
    sessionStorage.setItem("userId", res.data.user.id);
    checkSession()
}

// ----------------------- CHECK ONGOING USER SESSION -----------------------
const checkSession = () => {
    if (sessionStorage.getItem("token")){
        userNameDisplay.innerText = toUpperCaseStr(sessionStorage.getItem("user"));
        addClass([forms], "hidden")
        removeClass([logoutWrapper, booksWrapper], "hidden")
    } else {
        userNameDisplay.innerText = ""
        addClass([logoutWrapper], "hidden")
    }
    fetchBooks()
}

// ----------------------- ERROR MESSAGE BOX FORMS -----------------------
const displayError = (wrapper, error) => {
    wrapper.innerHTML = `
    <div class="alert alert-danger container" role="alert">
        <div class="row">
            <div class="col-auto">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div class="col">
                <span> ${error.response.data.message 
                    ? error.response.data.message[0].messages[0].message 
                    : error.response.data.error.message}</span>
            </div>
        </div>
    </div>`
}