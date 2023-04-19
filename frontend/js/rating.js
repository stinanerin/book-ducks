const starRating = (wrapper) => {
    const stars = wrapper.querySelectorAll("input[name='rate']")
    stars.forEach((star, index, arr) => 
        star.addEventListener('click', async() => {
            /* Changes stars directly on the DOM */

            /* Adds the book rating to the specifik book's rating component list - and removes user old rating for the same book if necessary */
            const updatedRatingsArr = await addRating(star.value, wrapper.dataset.id)
            /* If the rating ahs been succesfully updated - show the new clicked star in the DOM */
            updatedRatingsArr && activateStarsUpToIndex(index, arr)

            /* Updates the DOM with the book's new avg rating */
            wrapper.querySelector(".rating").innerText = avgRating(updatedRatingsArr)
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

        return updateRating(arr, bookId)
    } catch (error) {
        console.log("Error adding rating:", error);
        alert("Unable to add rating. Please try again later.");
    }
}

const updateRating = async(arr, bookId) => {
    try {
        const res = await axios.put(`http://localhost:1337/api/books/${bookId}?populate=*`,
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
        return res.data.data.attributes.rating
    } catch (error) {
        console.log("Error updating rating:", error);
        alert("Unable to update rating. Please try again later.");
    }
}

/**
 * @param {array} arr - strapi array of objects {rating: x, userId, y}
 */
const avgRating = (arr) => (arr.map(rate => rate.rating).reduce((a, b) => a + b, 0) / arr.length).toFixed(2)

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
    } catch(error) {
        console.log("Error adding user rating:", error);
        alert("Unable to add user rating. Please try again later.");
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
    } catch(error) {
        console.log("Error updating user ratings:", error);
        alert("Unable to update user ratings. Please try again later.");
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