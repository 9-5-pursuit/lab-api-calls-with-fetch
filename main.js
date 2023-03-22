const BASE_URL = "https://opentdb.com/api.php?amount=10";

fetch(BASE_URL)
  .then((response) => response.json())
  .then(displayQuestion)
  .catch((error) => {
    console.log(error);
  });

const form = document.querySelector("form");

function displayQuestion({ results }) {
  const data = results;

  data.forEach((element) => {
    let article = document.createElement("article");
    article.classList.add("card");

    let h2 = document.createElement("h2");
    h2.textContent = element.category;

    let p1 = document.createElement("p");
    p1.textContent = element.question;

    let button = document.createElement("button");
    button.textContent = "Show Answer";

    let p2 = document.createElement("p");
    p2.classList.add("hidden");
    p2.textContent = element.correct_answer;

    article.append(h2, p1, button, p2);
    document.querySelector("main.centered").append(article);

    button.addEventListener("click", () => {
      p2.classList.toggle("hidden");
    });
  });
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  displayQuestion;
});
