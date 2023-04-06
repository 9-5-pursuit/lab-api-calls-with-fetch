const form = document.querySelector("form");
const main = document.querySelector("main");
const BASE_URL = "https://opentdb.com/api.php?amount=10";
// <!----------------------------listens for submission---------------------------------------------->
form.addEventListener("submit", (event) => {
  // <!-------------stops refresh-------------------------------------------------------------------->
  event.preventDefault();
  //<!--------------fetch API data------------------------------------------------------------------->
  fetch(BASE_URL)
    .then((reponse) => reponse.json())
    .then((json) => {
      // <!--------usable JSON data------------------------------------------------------------------>
      const data = json.results;
      console.log(data);
      // <!--------function for each Trivia card----------------------------------------------------->
      data.forEach((result) => {
        TriviaQuestion(result);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
//  <!-----------------------under the hood---------------------------------------------------------->
const TriviaQuestion = (result) => {
  // <!-----------------------creating card---------------------------------------------------------->

  const card = document.createElement("article");
  card.classList.add("card");

  if (result.difficulty === "easy") {
    card.setAttribute("style", "border: 10px solid yellow");
  }
  if (result.difficulty === "medium") {
    card.setAttribute("style", "border: 10px solid orange");
  }
  if (result.difficulty === "hard") {
    card.setAttribute("style", "border: 10px solid red");
  }

  const category = document.createElement("h2");

  category.innerHTML = result.category;

  const question = document.createElement("p");

  question.innerHTML = result.question;

  const button = document.createElement("button");

  button.innerHTML = "Show Answer";

  const hidAnswer = document.createElement("p");

  hidAnswer.classList.add("hidden");
  hidAnswer.innerHTML = result.correct_answer;
  // <!-----------------------reveals the answer ------------------------------------------------------>
  button.addEventListener("click", () => {
    hidAnswer.classList.toggle(`hidden`);
  });
  // <!-------------------------locks card in place-------------------------------------------------->
  main.append(card);
  card.append(category, question, hidAnswer, button);
};
