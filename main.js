// const { results } = require("./cypress/fixtures/questions");

const BASE_URL = "https://opentdb.com/api.php?amount=10";

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(BASE_URL)
    .then((response) => response.json())
    .then((display) => {
      display.results.forEach((result) => {
        let main = document.querySelector("main.centered");
        let article = document.createElement("article");
        article.setAttribute("class", "card");

        let h2 = document.createElement("h2");
        h2.textContent = result.category;

        let p = document.createElement("p");
        let button = document.createElement("button");
        button.textContent = "Show Answer";
        p.append(button);
        p.textContent = result.question;

        let p2 = document.createElement("p");
        p2.classList.add("hidden");

        main.append(article);
        article.append(h2);
        article.append(p);
        article.append(button);
        article.append(p2);

        button.addEventListener("click", () => {
          p2.classList.toggle("hidden");
          p2.textContent = result.correct_answer;
          console.log(result.correct_answer);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
