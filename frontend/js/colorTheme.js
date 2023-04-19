const fetchClrTheme = async() => {
    try {
        const res = await axios.get("http://localhost:1337/api/color-theme?populate=*")
        const selectedTheme = res.data.data.attributes.colorTheme;
        applyTheme(selectedTheme);
    } catch(error) {
        // console.log(error);
        applyTheme("midnight")
    }
}

const applyTheme = (theme) => {
    const body = document.querySelector('body');
    addClass([body], theme)
}