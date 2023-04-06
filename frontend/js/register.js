// ----------------------- REGISTER FORM -----------------------
document.querySelector("#registerUser").addEventListener("submit", (e) => {
    e.preventDefault()
    addClass(formHelpers, "hidden");
    

    if(pwd.value !== confPwd.value) {
        passwordAlert.classList.remove("hidden")
        passwordAlert.querySelector("span").innerText = "The passwords do not match"
        console.log("pwd no matchi matchi");
        addClass([pwd, confPwd], "error")

    } else if(pwd.length < 6) { 
        passwordAlert.classList.remove("hidden")
        passwordAlert.querySelector("span").innerText = "Your password must be at least 6 characters long."
        console.log("pwd too short");
        addClass([pwd, confPwd], "error")
    
    } else {
        console.log("register ok");
        register()
        toggleClass([registerContainer], "hidden")
    }

})
// ----------------------- REGISTER USER IN STRAPI -----------------------
const register = async () => {
    console.log("register");
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
        console.log("reg user jwt", res.data.jwt);
        sessionStorage.setItem("token", res.data.jwt);
        toggleClass([registerContainer], "hidden")

    } catch(error) {
        console.log(error.response.data.error.message);
        feedback.innerText = error.response.data.error.message;
        feedback.style.color = "red"
    }
}
