const trivia_API = "https://opentdb.com/api.php?amount=10";
const main = document.querySelector("main");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(trivia_API)
    .then((response) => response.json())
    .then((json) => {
      // It erases the last 10 questions
      main.innerHTML = "";
      const results = json.results;
      results.forEach((result) => {
        displayResult(result);
      });
    })
    .catch((error) => {
      console.log("Error");
    });
});

const displayResult = (result) => {
  const card = document.createElement("article");
  card.classList.add("card");

  const category = document.createElement("h2");
  category.textContent = result.category;

  const p1 = document.createElement("p");
  p1.innerHTML = result.question;

  const button = document.createElement("button");
  button.textContent = "Show Answer";

  const p2 = document.createElement("p");
  p2.classList.add("hidden");
  p2.innerHTML = result.correct_answer;

  button.addEventListener("click", () => {
    p2.classList.toggle("hidden");
  });
  card.append(category, p1, button, p2);
  main.append(card);
};
