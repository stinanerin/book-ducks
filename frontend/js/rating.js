const rating = (wrapper) => {
    wrapper.querySelectorAll("input[name='rate']").forEach(star => 
        star.addEventListener('click', (e) => {
            changeRating(e.target)
        })
    );
}

const changeRating = (e) => {
    console.log("hej", e);
}