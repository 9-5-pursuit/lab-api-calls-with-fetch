const api_url = "https://opentdb.com/api.php?amount=10";
const form = document.querySelector("form");
const main = document.querySelector("main");

form.addEventListener("submit", (event) => {
  // prevent default behavior
  event.preventDefault();

  fetch(api_url)
    //   we are fetching the api_url
    // response is going to be what is returned after fetching it
    .then((response) => response.json())
    // response is a parameter
    // response.json() is to put it in Javascript Object Notation
    .then((json) => {
      // json is the parameter, it is the result from the first then

      // If response.json() Promise is successful, do this:
      main.innerHTML = "";
      //   we are reseting the page back to empty
      // used main so that whatever is inside no longer exist and is deleted
      const results = json.results;
      //   this is the results just in a variable

      results.forEach((result) => displayResult(result));
      //   iterating through the result
      // what does displyResult do?
      // displayResult is the function that is on the bottom of this
      // this is the
    })
    .catch((error) => {
      // in case it fails you get an error
      // If response.json() Promise is unsuccessful, do this:
      console.log(error);
    });
});

const displayResult = (result) => {
  console.log(result);
  /* 
    <article class="card">
        <h2>CATEGORY</h2>
        <p>QUESTION</p>
        <button>Show Answer</button>
        <p class="hidden">CORRECT ANSWER</p>
    </article>
    */

  // <article class="card">...</article>
  const card = document.createElement("article");
  card.classList.add("card");

  // <h2>CATEGORY</h2>
  const category = document.createElement("h2");
  category.textContent = result.category;

  // <p>QUESTION</p>
  const p1 = document.createElement("p");
  const question = result.question;
  p1.innerHTML = question;

  // <button>Show Answer</button>
  const button = document.createElement("button");
  button.textContent = "Show Answer";

  // <p class="hidden">CORRECT ANSWER</p>
  const p2 = document.createElement("p");
  p2.classList.add("hidden");
  p2.innerHTML = result.correct_answer;

  button.addEventListener("click", () => {
    // button.nextSibling.classList.toggle('hidden');
    p2.classList.toggle("hidden");
    // if (p2.classList.contains('hidden')) {
    //     p2.classList.remove("hidden");
    // }
    // else {
    //     p2.classList.add("hidden");
    // }
  });

  // Add card elements to the card
  card.append(category, p1, button, p2);
  // Add card to the main.centered element
  main.append(card);
};
