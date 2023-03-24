const form = document.querySelector("form"); // puts form in variable for easy use
form.addEventListener("submit", (event) => {
  event.preventDefault(); //avoids refreshing the form to default values
});

const BASE_URL = "http://opentdb.com/api.php?amount=10"; // API URL

fetch(BASE_URL)
  .then((response) => response.json()) //parse data from response
  .then((json) => {
    data = json.results; // usable data
    console.log(data);
    data.forEach((element) => {
      const main = document.querySelector("main"); //accesses main html section
      const article = document.createElement("article"); // creates article to hold trivia card
      article.classList.add("card"); // adds card class for tests
      main.append(article);
      article.innerHTML = `<h2>${element.category}</h2><p>${element.question}</p><button class="answer">Show Answer</button><p class="hidden", "class">${element.correct_answer}</p>`;

      const hiddenClass = document.querySelector(".hidden");
      const button = document.querySelector(".answer");

      button.addEventListener("click", (event) => {
        hiddenClass.style.display = "block";
      });
    });
  })
  .catch((error) => {
    // You can do what you like with the error here.
    console.log(error);
  });
