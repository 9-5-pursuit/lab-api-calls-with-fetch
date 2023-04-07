const triviaCategories = [
  {
    id: 9,
    name: "General Knowledge"
  },
  {
    id: 10,
    name: "Entertainment: Books"
  },
  {
    id: 11,
    name: "Entertainment: Film"
  },
  {
    id: 12,
    name: "Entertainment: Music"
  },
  {
    id: 13,
    name: "Entertainment: Musicals & Theatres"
  },
  {
    id: 14,
    name: "Entertainment: Television"
  },
  {
    id: 15,
    name: "Entertainment: Video Games"
  },
  {
    id: 16,
    name: "Entertainment: Board Games"
  },
  {
    id: 17,
    name: "Science & Nature"
  },
  {
    id: 18,
    name: "Science: Computers"
  },
  {
    id: 19,
    name: "Science: Mathematics"
  },
  {
    id: 20,
    name: "Mythology"
  },
  {
    id: 21,
    name: "Sports"
  },
  {
    id: 22,
    name: "Geography"
  },
  {
    id: 23,
    name: "History"
  },
  {
    id: 24,
    name: "Politics"
  },
  {
    id: 25,
    name: "Art"
  },
  {
    id: 26,
    name: "Celebrities"
  },
  {
    id: 27,
    name: "Animals"
  },
  {
    id: 28,
    name: "Vehicles"
  },
  {
    id: 29,
    name: "Entertainment: Comics"
  },
  {
    id: 30,
    name: "Science: Gadgets"
  },
  {
    id: 31,
    name: "Entertainment: Japanese Anime & Manga"
  },
  {
    id: 32,
    name: "Entertainment: Cartoon & Animations"
  }
];

const api_url = "https://opentdb.com/api.php?amount=10";
const form = document.querySelector("form");
const main = document.querySelector("main");

form.addEventListener("submit", (event) => {
  //...prevent refresh
  event.preventDefault();

  fetch(api_url)
    .then((response) => response.json())
    .then((json) => {
      //...if successful, do this:
      main.innerHTML = "";
      const results = json.results;
      setTimeout(() => {
        // results.forEach((result) => {});

        results.forEach((result) => displayResult(result));
      }, 2000);
      //...1. Create a result card
      //...2. Add it to "main"
    })
    .catch((error) => {
      //...if unsuccessful, do this:
      console.log(error);
    });
});

const displayResult = (result) => {
  console.log(result);
  /*
    <article class="card">
        <h2>CATEGORY</h2>
        <p>QUESTION</p>
        <button>Show Answser</button>
        <p class="hidden">CORRECT ANSWER</p>
    </article> 
    */
  const card = document.createElement("article");
  card.classList.add("card");

  const category = document.createElement("h2");
  category.textContent = result.category;

  const p1 = document.createElement("p");
  const question = result.question;
  p1.textContent = question;

  const button = document.createElement("button");
  button.textContent = "Show Answer";

  // create the element
  const p2 = document.createElement("p");
  // add a class
  p2.classList.add("hidden");
  // add content
  p2.innerHTML = result.correct_answer;

  button.addEventListener("click", () => {
    // button.nextSibling.classList.toggle('hidden');
    p2.classList.toggle("hidden");
    //  console.log(button, "you clicked the button!");
    //  if (p2.classList.contains("hidden")) {
    //     p2.classList.remove("hidden");
    //  }
    //  else {
    //     p2.classList.add("hidden");
    //  }
  });

  //...add card elements.
  card.append(category, p1, button, p2);

  //...add card to main.
  main.append(card);
};
