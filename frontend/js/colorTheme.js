const fetchClrTheme = async() => {
    try {
        const res = await axios.get("http://localhost:1337/api/color-theme?populate=*")
        const selectedTheme = res.data.data.attributes.colorTheme;
        applyTheme(selectedTheme);
    } catch(err) {
        console.log(err);
    }
}

const applyTheme = (theme) => {
    const body = document.querySelector('body');
    if(theme === "minimalist") {
       addClass([body], theme)
    } else if(theme === "midnight") {
        addClass([body], theme)
    }
}