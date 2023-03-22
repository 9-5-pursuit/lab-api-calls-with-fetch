const url = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";

fetch(url)
.then((response) => response.json())
.then((json) => {
    console.log(json);
    apiData(data);
})
.catch((error) => {
    console.log(error);
});

function apiData(data) {
    const center = document.querySelector(".card");
    data.results.forEach((response) => {
        const categories = response.category;
        const questions = response.question;
    });
}