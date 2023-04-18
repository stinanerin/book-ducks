let selectValue = "unsortered";

const renderSelect = (ratedBooks) => {
    ulRating.innerHTML += `
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
    const options = ulRating.querySelectorAll("option");
    /* Throws the selected attribute on the most recently choosen option, since it is rerendered in every sort as of now */
    [...options].find(option => option.value == selectValue) ? [...options].find(option => option.value == selectValue).selected = true: ""

     /* Iniates event listener for select */
     sortArray(ratedBooks)
}

const sortArray = (ratedBooks) => {
    document.querySelector('#sorting').addEventListener("change", (e) => {
        selectValue = e.target.value

        let sortedArr = ratedBooks

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

        renderBooks(sortedArr, "Rated", ulRating)
    })
}

const sortStringArr = (arr, key) => {
    return [...arr].sort(({attributes: a}, {attributes : b}) => {
        return a[key].localeCompare(b[key])
    })
}