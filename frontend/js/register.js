// ----------------------- REGISTER FORM -----------------------
document.querySelector("#registerUser").addEventListener("submit", (e) => {
    e.preventDefault()
    addClass([passwordAlert], "hidden");
    removeClass([pwd, confPwd], "error")

    const error = passwordAlert.querySelector("span")

    /* Pwd's do not match */
    if(pwd.value !== confPwd.value) {
        error.innerText = "The passwords do not match"
        removeClass([passwordAlert], "hidden")
        addClass([pwd, confPwd], "error")

    /* Pwd's too short */
    } else if(pwd.value.length < 6) { 
        error.innerText = "Your password must be at least 6 characters long."
        removeClass([passwordAlert], "hidden")
        addClass([pwd, confPwd], "error")
    
    } else {
        register()
    }
})

// ----------------------- REGISTER USER IN STRAPI -----------------------
const register = async () => {
    try {
        const res = await axios.post("http://localhost:1337/api/auth/local/register", {
            username: username.value,
            email: email.value,
            password: pwd.value,
        });
        if(res.status !== 200) {
            throw new Error(res.error.message);
        }
        addSession(res)

        clearValue([username, email, pwd, confPwd])
        removeClass([username, email], "error")
        clearElem([registerAlert])

    } catch(error) {
        displayError(registerAlert, error)
        addClass([username, email], "error");
    }
}
