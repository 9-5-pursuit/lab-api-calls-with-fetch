const url = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";
const form = document.querySelector("form");
const main = document.querySelector("main"); //after line 20 do line 3 to target main to append

form.addEventListener("submit", (event) => {
    event.preventDefault();
    //console.log("yes")


fetch(url)
//.then((response) => console.log(response))
.then((response) => response.json()) //returns the promise here as well we can check wether we can retrive the data from the link, if not successful it will go to ctach block
.then((json) => {
    main.innerHTML = "";
const results = json.results;
    //console.log(results); //successful
    results.forEach((result) => {
        displayResult(result);
    })
})
.catch((error) => { //unsuccessful
    console.log(error);
});
});

const displayResult = (result) => {
    console.log(result);
/*<
  article class="card">
  <h2>CATEGORY</h2>
  <p>QUESTION</p>
  <button>Show Answer</button>
  <p class="hidden">CORRECT ANSWER</p>
</article>
*/

//article class="card">
const card = document.createElement("article");
card.classList.add("card");
//console.log(card);

//<h2>CATEGORY</h2>
const category = document.createElement("h2");
category.textContent = result.category;

//<p>QUESTION</p>
const question = document.createElement("p");
question.innerHTML = result.question; //use innerHTML to avoid unnecessary special cha

//<button>Show Answer</button>
const button = document.createElement("button");
button.textContent = "Show Answer";



//<p class="hidden">CORRECT ANSWER</p>
const p = document.createElement("p");
p.classList.add("hidden");
p.innerHTML = result.correct_answer;   

button.addEventListener("click", () => {
       p.classList.toggle("hidden");
    // console.log(button, "click me");
    // if (p.classList.contains("hidden")) {
    //     p.classList.remove("hidden");
    // } else {
    //     p.classList.add("hidden");
    // }
});

//add card elements to card
card.append(category, question, button, p);
//add card to main
main.append(card);

}