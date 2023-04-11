const starRating = (wrapper) => {
    const stars = wrapper.querySelectorAll("input[name='rate']")
    stars.forEach((star, index, arr) => 
        star.addEventListener('click', () => {
            /* Changes stars directly on the DOM */
            activateStarsUpToIndex(index, arr)
            /* Adds the book rating to the books rating component list - and removes user old rating for the same book if necessary */
            addRating(star.value, wrapper.dataset.id)
            //todo Should I make a then and update the rating 3.99 directly to th  dom?
            /* Adds the book rating to the users rated books component list - and removes user old rating for the same book if necessary */
            addUsersRatings(star.value, wrapper.dataset.id)
        })
    )
}
    
const addRating = async(newRating, bookId) => {
    try {
        const res = await axios.get(`http://localhost:1337/api/books/${bookId}?populate=*`)
        const arr = res.data.data.attributes.rating;
        const userID = +sessionStorage.getItem("userId")

        /* If user already has rated book, remove old rating */
        removeRating(arr, "userId", userID)
        
        arr.push({
            rating: +newRating,
            userId: userID
        })

        updateRating(arr, bookId)
    } catch (error) {
        console.log(error);
    }
}

const updateRating = async(arr, bookId) => {
    try {
        await axios.put(`http://localhost:1337/api/books/${bookId}?populate=*`,
            {
                data: {
                    rating: arr
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            },
        )
    } catch (error) {
        console.log(error);
    }
}

const avgRating = (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)

const activateStarsUpToIndex = (index, starArr) => {
    // Makes copy in case incoming array is nodelist
    const labels = [...starArr].map(star => star.parentElement)
    removeClass(labels, "active");
    labels.slice(0, index + 1).forEach(star => addClass([star], "active"))
}

const addUsersRatings = async(newRating, id) => {
    try {
        const res = await fetchActiveUser()
        const arr = res.data.ratedBooks
        
        /* If user already has rated book, remove old rating */
        removeRating(arr, "bookId", id)

        arr.push({
            rating: newRating,
            bookId: id
        })

        updateUsersRatings(arr)
    } catch(err) {
        console.log(err);
    }
}

const updateUsersRatings = async(arr) => {
    try {
       await axios.put("http://localhost:1337/api/user/me",
            {
                data: {
                    ratedBooks: arr
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        )
    } catch(err) {
        console.log(err);
    }
}

/**
* @param {array}  arr - strapi array of rating objects
* @param {string}  objKey - the object key you want to examine
* @param {number}  value - the specified value you want to find & remove
*/ 

const removeRating = (arr, objKey, value) => {
    /* If user already has rated book, remove old rating */
    if(arr.find(elem => +elem[objKey] === +value)) {
        arr.splice(arr.indexOf(arr.find(elem => +elem[objKey] === +value)), 1)
    }
}