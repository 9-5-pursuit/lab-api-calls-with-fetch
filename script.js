const BASE_URL = "https://opentdb.com/api.php?amount=10";

const resetBtn = document.querySelector("form button");

fetch(BASE_URL)
  .then((element) => element.json())
  .then((json) => {
    //console.log(json);
    parsingTrivia(json);
  })
  .catch((error) => {
    console.log("Failed");
  });

function parsingTrivia(data) {
  const mainAnchor = document.querySelector("main");
  data.results.forEach((element) => {
    const cat = element.category;
    const question = element.question;
    const difficulty = element.difficulty;
    const correctAns = element.correct_answer;
    const craftable = createStruct(cat, question, difficulty, correctAns);
    mainAnchor.append(craftable);
  });
}

function createStruct(cat, question, difficulty, correctAns) {
  console.log(difficulty);
  const art = document.createElement("article");
  art.setAttribute("class", "card");
  if (difficulty === "hard") {
    art.style.borderColor = "red";
  } else if (difficulty === "medium") {
    art.style.borderColor = "orange";
  }

  const catHTwo = document.createElement("h2");
  catHTwo.textContent = cat;
  art.append(catHTwo);

  const que = document.createElement("p");
  que.innerHTML = question;
  catHTwo.after(que);

  const btn = document.createElement("button");
  btn.textContent = "Show Answer";

  que.after(btn);

  const varAnswer = document.createElement("p");
  varAnswer.setAttribute("class", "hidden");
  varAnswer.textContent = correctAns;
  btn.after(varAnswer);

  btn.addEventListener("click", () => {
    varAnswer.classList.toggle("hidden");
  });

  return art;
}
