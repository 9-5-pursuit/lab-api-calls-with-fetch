const BASE_URL = "https://opentdb.com/api.php?amount=10";
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(BASE_URL)
        .then((response) => response.json())
        .then(displayCard)
        .catch(displayError);
});

function displayCard({ results }) {

    const main = document.querySelector("main");
    main.innerHTML = "";

    for (let i = 0; i < results.length; i++){
        const questionCard = document.createElement("article");
        questionCard.classList.add("card");
        questionCard.innerHTML = `<h2>${results[i].category}</h2><p>${results[i].question}</p>`;

        const button = document.createElement("button");
        button.innerHTML = `Show Answer`;
        questionCard.append(button);

        const p2 = document.createElement("p");
        p2.classList.add("hidden")
        p2.innerHTML = results[i].correct_answer;
        questionCard.append(p2);

        button.addEventListener("click", () => {
            p2.classList.toggle("hidden");
        });

        main.append(questionCard);
    }
}

function displayError(error) {
    const mainError = document.querySelector("main");

    const pTag = document.createElement("p");
    pTag.textContent = "Something went wrong!";

    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = error;

    mainError.append(pTag, errorMessage);
}