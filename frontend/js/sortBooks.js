const sortStringArr = (arr, key) => {
    return [...arr].sort(({attributes: a}, {attributes : b}) => {
        return a[key].localeCompare(b[key])
    })
}

const renderSelect = () => {
    sortingDiv.innerHTML = `
    <div class="selectdiv">
        <label for="sorting" class="text-start form-label">Sort by</label> 
        <select class="form-select" id="sorting">
            <option value="unsortered">Unsortered</option>
            <option value="title">Title(A-Z)</option>
            <option value="author">Author(A-Z)</option>
            <option value="rating">Rating</option>
        </select>
    </div>`
}
 
const sortArray = (ratedBooks, ratings) => {
    const select = document.querySelector('#sorting');
    
    select.addEventListener("change", () => {
        /* If user chooses unsorted, just render the original arr */ 
        let sortedArr = ratedBooks

        if(select.value === "title") {

            sortedArr = sortStringArr(ratedBooks, "title")

        } else if(select.value === "author") {

            sortedArr = sortStringArr(ratedBooks, "author") 

        } else if(select.value === "rating") {
            
            sortedArr = ratings.sort(({rating: a}, {rating: b}) => b - a)
                .map(rating => booksArr.find(book => +book.id === +rating.bookId))
                .filter(book => book !== undefined)
        
        }
        renderBooks(sortedArr, "Rated", ulRating)
    })
}