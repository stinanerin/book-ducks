const toggleClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.toggle(aClass))
}
const addClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.add(aClass))
}
const removeClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.remove(aClass))
}