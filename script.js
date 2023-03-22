const trivia_API = "https://opentdb.com/api.php?amount=10";
fetch(trivia_API)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    parsedData(json);
    console.log("----------------++++++");
  })
  .catch((error) => {
    console.log("Error");
  });

function parsedData(data) {
  const mainA = document.querySelector(".card");
  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();

  console.log("----------------");
  data.results.forEach((element) => {
    const question = element.question;
    const answer = element.correct_answer;
    console.log(`Question: ${question} ,   =>> Answer: ${answer}`);
  });
  console.log("----------------");
  const quesTag = document.createElement("p");
  quesTag.textContent = question;
  //   });
}
