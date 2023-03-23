// figure out how to connect an api to our JS code
// create an event listener for the questions once we click on the question to reveal the answer
// connect the new question button to an EventListener to refresh and get new questions
const api_url = "https://opentdb.com/api.php?amount=10";
const form = document.querySelector("form");
const main = document.querySelector("main");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(api_url)
    .then((response) => response.json())
    .then((json) => {
      main.innerHTML = "";
      const results = json.results;
      // If response.json() Promise is successful, do this:
      results.forEach((result) => {
        displayResult(result);
        // 1. Create a result card
        // 2. Add it to "main"
      });
    })
    .catch((error) => {
      // If response.json() Promise is unsuccessful, do this:
      console.log(error);
    });
});

const displayResult = (result) => {
  /* <article class="card">
      <h2>CATEGORY</h2>
      <p>QUESTION</p>
      <button>Show Answer</button>
      <p class="hidden">CORRECT ANSWER</p>
    </article> */
  //Instead of manually creating in HTML use JS to create a card
  const card = document.createElement("article");
  //adding class to the card
  card.classList.add("card");
  //creating h2 element
  const category = document.createElement("h2");
  //set the text equal to the result for the category(using dot notation) being pulled in from the API
  category.textContent = result.category;

  //create the p to hold the question
  const p1 = document.createElement("p");
  //declare question variable set equal to the result.question which pulls from the API
  const question = result.question;
  //sets the p1 text equal to the question using innerHTML so the punctuation is correct when the question is displayed
  p1.innerHTML = question;

  //creating the button on the card to show the answer
  const button = document.createElement("button");
  button.textContent = "Show Answer";
  // creates a p element to hold the answer w/ a hidden class so that it does not display
  const hiddenAnswer = document.createElement("p");
  hiddenAnswer.classList.add("hidden");
  hiddenAnswer.innerHTML = result.correct_answer;
  //Adding the functionality to the button so that it can be interactive
  button.addEventListener("click", () => {
    if (hiddenAnswer.classList.contains("hidden")) {
      hiddenAnswer.classList.remove("hidden");
    } else {
      hiddenAnswer.classList.add("hidden");
    }
  });
  // once we click the answer button the class of hidden will be removed from the P element and the text will be displayed

  card.append(category, p1, button, hiddenAnswer);
  main.append(card);
};
