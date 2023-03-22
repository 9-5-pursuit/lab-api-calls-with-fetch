const BASE_URL = "https://opentdb.com/api.php?amount=10";

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

fetch(BASE_URL)
  .then((response) => response.json()) //(parse) request and retrieve data from the url
  .then((output) => {
    //handle the parsed JSON data. What do you want the output to be?
    const main = document.querySelector("main");

    let array = output.results;
    array.forEach((el) => {
      //console.log(element.category)
      //create an article element and append it to the main tag

      const article = document.createElement("article");
      article.classList.add("card");
      article.innerHTML = `<h2>${el.category}</h2>
  <p>${el.question}</p>
  <button class = answer>Show Answer</button>
  <p class="hidden">${el.correct_answer}</p>`;
      main.append(article);

      const button = document.querySelector(".answer");
      const hiddenClass = document.querySelector(".hidden");
      button.addEventListener("click", (event) => {
        hiddenClass.style.display = "block"; //update the display
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
