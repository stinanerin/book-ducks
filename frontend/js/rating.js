const rating = (wrapper) => {
    const stars = wrapper.querySelectorAll("input[name='rate']")
    stars.forEach((star, index, arr) => 
        star.addEventListener('click', (e) => {
            const labels = [...arr].map(star => star.parentElement)
            removeClass(labels, "active");
            labels.slice(0, index + 1).forEach(star => addClass([star], "active"))
            addRating(star.value, wrapper.dataset.id)
        })
    )
}
    
const addRating = async(newRating, bookId) => {
    try {
        console.log("rating", newRating, "bookID", bookId);
        const res = await axios.get(`http://localhost:1337/api/books/${bookId}?populate=*`)
        const arr = res.data.data.attributes.rating;
        console.log("pre push", arr);
        arr.push({rating: newRating})
        console.log("after push", arr);
        updateRating(arr, bookId)
    } catch (error) {
        console.log(error);
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
        console.log(res.data.data.attributes.rating);
        
    } catch (error) {
        console.log(error);
    }
}