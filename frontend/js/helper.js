const toggleClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.toggle(aClass))
}
const addClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.add(aClass))
}
const removeClass = (arr, aClass) => {
    arr.forEach(elem => elem.classList.remove(aClass))
}
const clearElem = (arr) => {
    arr.forEach(elem => elem.innerHTML = "")
}
const clearValue = (arr) => {
    arr.forEach(elem => elem.value = "")
}

const toUpperCaseStr = (str) => str.split(" ").map(word => {return word[0].toUpperCase() + word.slice(1)}).join(" ")

const createElement = (tag, classes) => {
    const element = document.createElement(tag);
    if (classes) {
      element.className = classes
    }
    return element;
};