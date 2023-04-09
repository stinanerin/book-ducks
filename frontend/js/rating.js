const starRating = (wrapper) => {
    const stars = wrapper.querySelectorAll("input[name='rate']")
    stars.forEach((star, index, arr) => 
        star.addEventListener('click', () => {
            const labels = [...arr].map(star => star.parentElement)
            removeClass(labels, "active");
            labels.slice(0, index + 1).forEach(star => addClass([star], "active"))
            addRating(star.value, wrapper.dataset.id)
            addUsersRatings(star.value, wrapper.dataset.id)
        })
    )
}
    
const addRating = async(newRating, bookId) => {
    try {
        console.log("rating", newRating, "bookID", bookId);
        const res = await axios.get(`http://localhost:1337/api/books/${bookId}?populate=*`)
        const arr = res.data.data.attributes.rating;
        // console.log("pre push", arr);
        arr.push({rating: newRating})
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

const addUsersRatings = async(newRating, id) => {
    try {
        console.log("rating", newRating, "bookID", id);
        const res = await axios.get(`http://localhost:1337/api/users/me?populate=*`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
        const arr = res.data.ratedBooks
        console.log("pre push", arr);
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
        const res = await axios.put("http://localhost:1337/api/user/me",
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