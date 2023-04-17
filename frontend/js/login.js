const forms  = document.querySelector('#formWrapper'),
    loginLink  = document.querySelector('#loginLink'),
    registerLink  = document.querySelector('#registerLink'),
    loginContainer =  document.querySelector("#loginWrapper"),
    loginAlert =  document.querySelector("#login-alert-container"),
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

    login(document.querySelector("#loginEmail"), document.querySelector("#loginPWD"))
})

// ----------------------- LOGIN USER AGAINST STRAPI -----------------------
const login = async() => {
    try {
        const res = await axios.post("http://localhost:1337/api/auth/local", {
            identifier: loginEmail.value,
            password: loginPwd.value,
        })
        addSession(res)
        removeClass([booksWrapper], "hidden")
    } catch(err) {
        loginAlert.innerHTML = `
        <div class="alert alert-danger container" role="alert">
            <div class="row">
                <div class="col-auto">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="col">
                    <span> ${err.response.data.message 
                        ? err.response.data.message[0].messages[0].message 
                        : err.response.data.error.message}</span>
                </div>
            </div>
        </div>`
        addClass([loginEmail, loginPwd], "error");
    }
}

// ----------------------- ADD USER TO SESSION STORAGE -----------------------
const addSession = (res) => {
    //todo create object!!
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
        removeClass([logoutWrapper], "hidden")

        //! obs behöver man tänka på att undvika så två kan vara inloggade samtidigt?
    } else {
        userNameDisplay.innerText = ""
        addClass([logoutWrapper], "hidden")
    }
    fetchBooks()
}