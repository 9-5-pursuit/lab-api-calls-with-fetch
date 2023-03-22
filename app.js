const BASE_URL = "https://opentdb.com/api.php?amount=10";

const button = document.querySelector("button");

const main = document.querySelector("main");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  await fetch(BASE_URL)
    .then((response) => response.json())
    .then((data) => {
      let questions = data.results;

      for (let i = 0; i < questions.length; i++) {
        let category = questions[i].category;
        let q = questions[i].question;
        let difficulty = questions[i].difficulty;
        let rightAnswer = questions[i].correct_answer;

        let div = document.createElement("div");
        main.appendChild(div);
        div.innerHTML = `
                <article class="card">
                <h2>${category}</h2>
                <p>${q}</p>
                <button >Show Answer</button>
                <p class="hidden">${rightAnswer}</p>
                </article>
                `;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
