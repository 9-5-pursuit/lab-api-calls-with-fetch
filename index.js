const urlInfo = "https://opentdb.com/api.php?amount=10";

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(urlInfo)
    .then((response) => response.json())
    .then((json) => {
      const main = document.querySelector("main");
      const arr = json.results;
      arr.forEach((ele) => {
        const article = document.createElement("article");

        article.setAttribute("class", "card");
        article.innerHTML = `<h2>${ele.category}</h2>
                    <p>${ele.question}</p>
                    <button>Show Answer</button>
                    <p class="hidden">${ele.correct_answer}</p>`;
        const button = document.querySelector("button");
        const hiddenAns = document.querySelector(".hidden");
        button.addEventListener("click", () => {
          hiddenAns.style.display = "block";
        });

        main.append(article);
      });
    })
    .catch((error) => console.log(error));
});
