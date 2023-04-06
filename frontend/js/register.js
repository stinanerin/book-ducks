// ----------------------- REGISTER FORM -----------------------
document.querySelector("#registerUser").addEventListener("submit", (e) => {
    e.preventDefault()
    addClass(formHelpers, "hidden");

    if(pwd.value !== confPwd.value) {
        console.log("pwd no matchi matchi");
        passwordAlert.querySelector("span").innerText = "The passwords do not match"
        passwordAlert.classList.remove("hidden")
        addClass([pwd, confPwd], "error")

    } else if(pwd.value.length < 6) { 
        console.log("pwd too short");
        passwordAlert.querySelector("span").innerText = "Your password must be at least 6 characters long."
        passwordAlert.classList.remove("hidden")
        addClass([pwd, confPwd], "error")
    
    } else {
        console.log("own validation ok");
        register()
    }
})
// ----------------------- REGISTER USER IN STRAPI -----------------------
const register = async () => {
    console.log("register in strapi func");
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
        // toggleClass([registerContainer], "hidden")
    } catch(error) {
        console.log(error.response.data.error.message);
        feedback.innerText = error.response.data.error.message;
        feedback.style.color = "red"
    }
}
