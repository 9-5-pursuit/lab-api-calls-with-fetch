const main = document.querySelector("main");
const button = document.querySelector("button");

button.addEventListener("click", (event) => {
  event.preventDefault();

  fetch("https://opentdb.com/api.php?amount=10")
    .then((response) => response.json())
    .then((data) => {
      const questions = data.results;

      for (const question of questions) {
        const article = document.createElement("article");
        article.classList.add("card");

        const h2 = document.createElement("h2");
        h2.textContent = question.category;

        const pTag1 = document.createElement("p");
        pTag1.textContent = question.question;

        const button = document.createElement("button");
        button.textContent = "Show Answer";
        button.addEventListener("click", () => {
          pTag2.classList.toggle("hidden");
        });

        const pTag2 = document.createElement("p");
        pTag2.classList.add("hidden");
        pTag2.textContent = question.correct_answer;

        article.append(h2);
        article.append(pTag1);
        article.append(button);
        article.append(pTag2);
        main.append(article);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
