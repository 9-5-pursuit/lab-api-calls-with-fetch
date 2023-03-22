let api_url = "https://opentdb.com/api.php?amount=10"
let form = document.querySelector("form")
let main = document.querySelector("main")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(api_url)
    .then((response) => response.json())
    .then((json) => {
        const results = json.results
        results.forEach(result => {
            appResult(result);
        });
    })
    .catch((error) => {
        console.log(error)
    })
})

const appResult = (result) => {
    const card = document.createElement("article");
    card.classList.add("card")

    const category = document.createElement("h2")
    category.textContent = result.category

    const question = document.createElement("p")
    question.innerText = result.question

    const button = document.createElement("button")
    button.innerText = "Show Answer"


    const p2 = document.createElement("p")
    p2.classList.add("hidden")
    p2.innerHTML = result.correct_answer;

    button.addEventListener("click", () => {
       p2.classList.toggle(`hidden`);

       if (p2.classList.contains(`hidden`)) {
        p2.classList.remove("hidden")
    } else {
        p2.classList.add("hidden")
    }
    })

    card.append(category, question, button, p2);
    main.append(card);

}


// fetch("https://opentdb.com/api.php?amount=10").then(res => {
//     return res.json()
// })
//  .then(triviaQuestions => {
//   triviaQuestions.forEach(element => {
//     console.log(element)
//   });
//  })
//  .catch(error => {
//     console.log("error")
//  } )


// async function triviaApp() {
//     let response = await fetch("https://opentdb.com/api.php?amount=10")
//     let data = await response.json()
//     return data
// }

// // triviaApp().then((data) => console.log(data.results))
// triviaApp("https://opentdb.com/api.php?amount=10")

// console.log(data)
// const button = document.querySelector("button")

// button.addEventListener(`click`, (triviaApp) => {
//   button.innerText = 
// })

