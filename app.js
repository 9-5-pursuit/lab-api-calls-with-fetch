const BASE_URL = "https://opentdb.com/api.php?amount=10";
const form = document.querySelector("form");  
const main = document.querySelector("main"); 

form.addEventListener("submit", (event) => {
    //prvent default refresh of the form.      
    event.preventDefault();

    fetch(BASE_URL)
        .then((reponse) => reponse.json())
        .then((json) => {
            const results = json.results;
            results.forEach((result) => {
             displayTriviaQuestion(result)   
            });
        })
        .catch((error) => {
            console.log(error)
        });
})

const displayTriviaQuestion = (result) => {
        console.log(result)

    const card = document.createElement("article");
    card.classList.add("card");

    const category = document.createElement("h2");
    // main.append(h2);
    category.textContent = result.category;

    const question = document.createElement("p");
    // main.append(p1)
    question.innerHTML = result.question;

    const button = document.createElement("button");
    // card.append(button)
    button.textContent = "Show Answer"

    const p2 = document.createElement("p");
    // card.append(p1);
     p2.classList.add("hidden")
    p2.innerHTML = result.correct_answer;

    button.addEventListener("click", () => {
        p2.classList.toggle(`hidden`)
    })

       card.append(category, question, button, p2);
       main.append(card);

}


  
