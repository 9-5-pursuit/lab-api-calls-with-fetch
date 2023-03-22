const BASE_URL = "https://opentdb.com/api_config.php";

fetch(BASE_URL)
.then((response) => response.json())
.then(displayCard)
.catch(displayError);

function displayCard({ results }) {
    const [questions] = results;
    const {category, question, answer, language} = questions.card;

    const main = document.querySelector("main");
    const newQuestions = document.querySelector("button");

    newQuestions.addEventListener("click", () => {
        for (let i = 0; i < 11; i++){
            const questionCard = document.createElement("article");
            questionCard.classList.add("card");
            questionCard.innerHTML = `<h2>${category}</h2><p>${question}</p><button>Show Answer</button><p class="hidden">${answer}</p><p>${language}</p>`;
            main.append(questionCard);
        }
        const showAnswer = document.querySelector(".hidden");
        showAnswer.addEventListener("click", (event) => {
            
        });
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