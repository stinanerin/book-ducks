const loginLink  = document.querySelector('#loginLink'),
    registerLink  = document.querySelector('#registerLink'),
    loginContainer =  document.querySelector("#loginWrapper"),
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
        console.log("login res",res);
        addSession(res)
    } catch(err) {
        console.log(err);
        feedback.innerText = err;
    }
}

// ----------------------- ADD USER TO SESSION STORAGE -----------------------
const addSession = (res) => {
    sessionStorage.setItem("token", res.data.jwt);
    sessionStorage.setItem("user", res.data.user.username);
    checkSession()
}

// ----------------------- CHECK ONGOING USER SESSION -----------------------
const checkSession = () => {
    if (sessionStorage.getItem("token")){
        userNameDisplay.innerText = toUpperCaseStr(sessionStorage.getItem("user"));
        addClass([loginContainer, registerContainer], "hidden")

        //! obs behöver man tänka på att undvika så två kan vara inloggade samtidigt?
    } else {
        userNameDisplay.innerText = ""
        removeClass([registerContainer], "hidden")
    }
}