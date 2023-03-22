
let formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();

   fetch("https://opentdb.com/api.php?amount=10")
   .then((response) => response.json())
   .then((response) => {
    let array = response.results
    let main = document.querySelector(".centered");
    array.forEach((object) => {
        const article = document.createElement("article")
        article.setAttribute("class", "card");
        
        const h2 = document.createElement("h2");
        h2.textContent = object.category
        article.append(h2);

        const paragraph = document.createElement("p");
        paragraph.textContent = object.question;
        article.append(paragraph);

        let button = document.createElement("button");
        button.textContent = "Show Answer"

        button.setAttribute("style", "background: black; border-style: none")

        article.append(button);

        let para = document.createElement("p");
        para.setAttribute("class", "hidden")
        para.textContent = object.correct_answer;

        button.addEventListener("click", () => {
            para.classList.toggle("hidden");
            article.append(para);
        })

        if(object.difficulty === "easy"){
            article.setAttribute("style", "border: 4px solid green");
        }
        if(object.difficulty === "medium"){
            article.setAttribute("style", "border: 4px solid yellow");
        }
        if(object.difficulty === "easy"){
            article.setAttribute("style", "border: 4px solid red");
        }

        main.append(article)

    })
   })
   .catch((error) => {
    console.log(error);
   })

})