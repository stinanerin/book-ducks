// ----------------------- REGISTER FORM -----------------------
document.querySelector("#registerUser").addEventListener("submit", (e) => {
    e.preventDefault()
    addClass(formHelpers, "hidden");

    const error = passwordAlert.querySelector("span")

    if(pwd.value !== confPwd.value) {
        console.log("pwd no matchi matchi");
        error.innerText = "The passwords do not match"
        passwordAlert.classList.remove("hidden")
        addClass([pwd, confPwd], "error")

    } else if(pwd.value.length < 6) { 
        console.log("pwd too short");
        error.innerText = "Your password must be at least 6 characters long."
        passwordAlert.classList.remove("hidden")
        addClass([pwd, confPwd], "error")
    
    } else {
        console.log("own validation ok");
        register()
    }
})

// ----------------------- REGISTER USER IN STRAPI -----------------------
const register = async () => {
    try {
        let res = await axios.post("http://localhost:1337/api/auth/local/register",{
            username: username.value,
            email: email.value,
            password: pwd.value,
        });
        console.log(res);
        if(res.status !== 200) {
            console.log(res);
            throw new Error(res.error.message);
        }
        addSession(res)
    } catch(error) {
        //todo
        console.log(error.response.data.error.message);
        feedback.innerText = error.response.data.error.message;
        feedback.style.color = "red"
    }
}
