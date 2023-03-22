const form = document.querySelector("form");
const formFields = form.elements;
const element = formFields["trivia_category"];
const main = document.querySelector("main");
let url = "https://opentdb.com/api.php?amount=10";
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(element.value!=="any") { 
        url = "https://opentdb.com/api.php?amount=10&category="+element.value;
    }
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            main.innerHTML = "";
            let results = json.results;
            for (let result of results)
            {
                display(result);
            }
        })
        .catch((error) => {

        });
})
const display = (result) => {
    const article = document.createElement("article");
    article.className = "card";
    if(result.difficulty === "medium") {
        article.setAttribute("style","border: 3px solid yellow");
    } else if(result.difficulty === "hard") {
        article.setAttribute("style","border: 3px solid red");
    }
    const h2 = document.createElement("h2");
    h2.textContent= result.category;
    const p = document.createElement("p");
    p.innerHTML = result.question;
    const button = document.createElement("button");
    button.textContent = "Show Answer";
    const p2 = document.createElement("p");
    p2.className = "hidden";
    p2.innerHTML = result.correct_answer;
    button.addEventListener("click" , () => {
       if(p2.className === "hidden") {
        p2.className = "";
       } else {
        p2.className = "hidden";
       }
    });
    article.append(h2,p,button,p2);
    main.append(article);
}