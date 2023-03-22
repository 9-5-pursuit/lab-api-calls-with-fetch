const BASE_URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean";

fetch(BASE_URL)
.then((response) => response.json())
.then(displayCard)
.catch(displayError);

function displayCard({ results }) {
    const [questions] = results;

    const main = document.querySelector("main");
    const newQuestions = document.querySelector("button");

    newQuestions.addEventListener("click", (event) => {
        event.preventDefault();
        for (let i = 0; i < results.length; i++){
            const questionCard = document.createElement("article");
            questionCard.classList.add("card");
            questionCard.innerHTML = `<h2>${results[i].category}</h2><p>${results[i].question}</p><button>Show Answer</button><p class="hidden">${results[i].correct_answer}</p>`;
            main.append(questionCard);
        }
    });
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