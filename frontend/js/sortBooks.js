/* Global variable with default value for filtering of rated books list, as the enitre UL is currently rerendered on each change */
let selectValue = "unsortered";

const renderSelect = (ratedBooks) => {
    ul.innerHTML += `
    <div class="text-sm-end mt-0 px-sm-5" id="sortingDiv">           
        <div class="select-div text-start ">
            <label for="sorting" class="form-label">Sort by</label> 
            <select class="form-select" id="sorting">
                <option value="unsortered">Unsortered</option>
                <option value="title">Title(A-Z)</option>
                <option value="author">Author(A-Z)</option>
                <option value="rating">Rating</option>
            </select>
        </div>
    </div>`
    
    /* Iniates event listener for select */
    handleSorting(ratedBooks)
}

const handleSorting = (ratedBooks) => {
    document.querySelector('#sorting').addEventListener("change", (e) => {
        selectValue = e.target.value
        const arr = sortArrByValue(selectValue, ratedBooks)
        renderBooks(arr, "Rated")
    })
}

/**
* @param {array}  arr - array of users rated books
* @param {string}  key - the object key you want to sort the array according to
*/ 
const sortStringArr = (arr, key) => {
    return [...arr].sort(({attributes: a}, {attributes : b}) => {
        return a[key].localeCompare(b[key])
    })
}

const sortArrByValue = (selectValue, arr) => {
    let sortedArr = arr

    if(selectValue === "title") {
        sortedArr = sortStringArr(sortedArr, "title")

    } else if(selectValue === "author") {

        sortedArr = sortStringArr(sortedArr, "author") 

    } else if(selectValue === "rating") {
        
        sortedArr = ratings.sort(({rating: a}, {rating: b}) => b - a)
            .map(rating => booksArr.find(book => +book.id === +rating.bookId))
            .filter(book => book !== undefined)
    
    } else {
        sortedArr.sort((a, b) => a.id - b.id);
    }
    return sortedArr

}