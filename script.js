// const trivia_API = "https://opentdb.com/api.php?amount=10";
// fetch(trivia_API)
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json);
//     parsedData(json);
//     console.log("----------------++++++");
//   })
//   .catch((error) => {
//     console.log("Error");
//   });

// function parsedData(data) {
//   const mainA = document.querySelector(".card");
//   const form = document.querySelector("form");
//   //   form.addEventListener("submit", (e) => {
//   //     e.preventDefault();

//   console.log("----------------");
//   data.results.forEach((element) => {
//     const question = element.question;
//     const answer = element.correct_answer;
//     console.log(`Question: ${question} ,   =>> Answer: ${answer}`);
//   });
//   console.log("----------------");
//   const quesTag = document.createElement("p");
//   quesTag.textContent = question;
//   //   });
// }

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
  console.log(result);

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

  // card.append(category, p1, button, p2);
  // main.append(card);

  button.addEventListener("click", () => {
    p2.classList.toggle("hidden");
  });

  card.append(category, p1, button, p2);
  main.append(card);
};
/*
if (p2.classList.contains('hidden')) {
    p2.classList.remove("hidden");
}
else {
    p2.classList.add("hidden");
}
} or you use toggle
*/

// card.append(category, p1, button, p2);
// main.append(card);
