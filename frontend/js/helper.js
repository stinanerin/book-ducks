const toggleClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.toggle(aClass))
}
const addClass = (arr, aClass) => {
    arr.forEach(elem => elem.className = aClass)
}
const removeClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.remove(aClass))
}

const toUpperCaseStr = (str) => str.split(" ").map(word => {return word[0].toUpperCase() + word.slice(1)}).join(" ")