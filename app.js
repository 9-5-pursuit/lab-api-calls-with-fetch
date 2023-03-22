let triviaQuestions = "https://opentdb.com/api.php?amount=10"
let triviaCategories = "https://opentdb.com/api_category.php"

function fetchAPI(url, callback) {
    fetch(url)
        .then((response) => {
          return response.json()
        })
        .then((response) => {
          callback(response)
        })
        .catch((error) => {
          console.log(error)
        })
}

let categoriesLabel = document.createElement("label")
categoriesLabel.innerHTML = "<br>Choose your category:"
categoriesLabel.setAttribute("for", "categories")


let categories = document.createElement("select")
categories.setAttribute("id", "categories")
categories.style.border = "2px solid black"


document.querySelector("section.centered form").append(categoriesLabel)
categoriesLabel.after(categories)

let anyCategory = document.createElement("option")
anyCategory.setAttribute("id", "8")
anyCategory.setAttribute("value", "8")
anyCategory.textContent = "Any Category"
categories.append(anyCategory)


fetchAPI(triviaCategories, function (response) {
    let allCategories = response["trivia_categories"]

    allCategories.forEach((topic) => {
        let category = document.createElement("option")
     
        category.setAttribute("id", `_${topic.id}`)
        category.setAttribute("value", `${topic.id}`)
        category.textContent = `${topic.name}`

        categories.append(category)
    })
})

function generateQuestions() {
    fetchAPI(triviaQuestions, function (response) {
        let questions = response.results
        let accumulator = 30

        questions.forEach((question) => {
            let article = document.createElement("article")
            article.classList.add("card")
            document.querySelector("main.centered").append(article)

            let h2 = document.createElement("h2")
            h2.innerHTML = question.category
            article.append(h2)

            let p = document.createElement("p")
            p.innerHTML = question.question
            h2.after(p)

            if (question.difficulty === "easy") {
                article.style.border = "2px solid green"
            } else if (question.difficulty === "medium") {
                article.style.border = "2px solid yellow"
            } else if (question.difficulty === "hard") {
                article.style.border = "2px solid red"
            }

            if (question.type === "multiple") {
                const multipleChoices = []

                multipleChoices.push(question["correct_answer"])

                question["incorrect_answers"].forEach((answer) => {
                    multipleChoices.push(answer)
                })

                const randomChoices = []

                for (let i = 0; i < 4; i++) {
                    let randomChoice = multipleChoices[Math.floor(Math.random()*multipleChoices.length)]

                    if (randomChoices.includes(randomChoice)) {
                        i--
                    } else {
                        randomChoices.push(randomChoice)
                    }
                }

                let listOfChoices = document.createElement("ul")
                listOfChoices.classList.add(`answers` + accumulator)

                p.after(listOfChoices)

                for (const choice of randomChoices) {
                    let listChoice = document.createElement("li")
                    listChoice.setAttribute("style", "list-style: none")
                    listChoice.innerHTML = choice

                    let radio = document.createElement("input")
                    radio.setAttribute("type", "radio")
                    radio.setAttribute("name", `choice${accumulator}`)
                    radio.classList.add("radio")
                    listChoice.prepend(radio)

                    listOfChoices.append(listChoice)
                }

                
            } else {
                let button = document.createElement("button")
                button.setAttribute("type", "submit")
                button.textContent = "Show Answer"
                p.after(button)

                let p2 = document.createElement("p")
                p2.classList.add("hidden")
                p2.innerHTML = question["correct_answer"]
                button.after(p2)

                button.addEventListener("click", (event) => {
                    event.preventDefault()
                    p2.classList.toggle("hidden")
                })
            }

            let choiceButtons = document.querySelectorAll(`.answers${accumulator} li .radio`)

            let answers = document.querySelectorAll(`.answers${accumulator} li`)

            choiceButtons.forEach((choice) => {
                choice.addEventListener("click", (event) => {
                    for (let answer of answers) {
                        if (answer.textContent === question["correct_answer"]) {
                            answer.style.border = "2px solid green"
                        }
                    }
                })
            })
            
            accumulator++
        })
    })
}




document.querySelector("form button").addEventListener("click", (event) => {
    event.preventDefault()

    if (!!(document.querySelector("main.centered article"))) {
        document.querySelectorAll("main.centered article").forEach((trivia) => {
            trivia.remove()
        })

        correctAnswers = []

        if (categories.value === "8") {
            generateQuestions()
        } else {
            triviaQuestions += `&category=${categories.value}`
            generateQuestions()
        }
    } else {
        correctAnswers = []

        if (categories.value === "8") {
            generateQuestions()
        } else {
            triviaQuestions += `&category=${categories.value}`
            generateQuestions()
        }
    }
})