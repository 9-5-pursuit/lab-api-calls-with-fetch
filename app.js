const form = document.querySelector("form")
const main = document.querySelector("main.centered");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=medium")
        .then((response) => {

            return response.json();
        })
        .then((response) => {
            main.innerHTML = "";
            console.log(response)
            response.results.forEach((item) => {

                console.log(item)
                //create article and set it's class attribute
                const article = document.createElement("article")
                article.setAttribute("class", "card");

                //create an H2 with a textContent of item.category
                const h2 = document.createElement("h2");
                h2.textContent = item.category;
                article.append(h2);

                //create p element and set it's class attribute to question attribute to item.question.textContents
                const p = document.createElement("p");
                p.innerHTML = item.question;
                p.setAttribute("class", "question");
                article.append(p);

                //create a button element and make it's text content item["correct_answer"]
                const button = document.createElement("button");
                button.textContent = "SHOW ANSWER";
                article.append(button);

                //create a paragraph with a class of hidden and .textContent of item["correct_answer"]
                const hiddenParagraph = document.createElement("p")
                hiddenParagraph.setAttribute("class", "hidden");
                hiddenParagraph.innerHTML = item["correct_answer"];

                article.append(hiddenParagraph)

                //create an on click event to button to change the display of hiddenParagraph from none to block
                button.addEventListener("click", () => {
                    //tried to use toggle but it didn't work for some reason
                    // hiddenParagraph.style.display.toggle("none");
                    if (hiddenParagraph.style.display === "none"){
                        hiddenParagraph.style.display = "block"
                    }   
                    else {
                        hiddenParagraph.style.display = "none"
                    }
                })

                main.append(article)
            })
        })
        .catch((error) => {
            console.log(error);
        })
})
// const main = document.querySelector("main.centered");

// function fetchData() {

//     fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=medium")
//         .then((response) => {

//             return response.json();
//         })
//         .then((response) => {

//             console.log(response)
//             response.results.forEach((item) => {

//                 console.log(item)
//                 //create article and set it's class attribute
//                 const article = document.createElement("article")
//                 article.setAttribute("class", "card");

//                 //create an H2 with a textContent of item.category
//                 const h2 = document.createElement("h2");
//                 h2.textContent = item.category;
//                 article.append(h2);

//                 //create p element and set it's class attribute to question attribute to item.question.textContents
//                 const p = document.createElement("p");
//                 p.textContent = item.question;
//                 p.setAttribute("class", "question");
//                 article.append(p);

//                 //create a button element and make it's text content item["correct_answer"]
//                 const button = document.createElement("button");
//                 button.textContent = "SHOW ANSWER";
//                 article.append(button);

//                 //create a paragraph with a class of hidden and .textContent of item["correct_answer"]
//                 const hiddenParagraph = document.createElement("p")
//                 hiddenParagraph.setAttribute("class", "hidden");
//                 hiddenParagraph.textContent = item["correct_answer"];
//                 hiddenParagraph.style.display = "none";
//                 article.append(hiddenParagraph)

//                 //create an on click event to button to change the display of hiddenParagraph from none to block
//                 button.addEventListener("click", () => {
//                     //tried to use toggle but it didn't work for some reason
//                     // hiddenParagraph.style.display.toggle("none");
//                     hiddenParagraph.style.display = "block"
//                 })

//                 main.append(article)
//             })
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }

// fetchData();


/* <article class="card">
  <h2>CATEGORY</h2>
  <p>QUESTION</p>
  <button>Show Answer</button>
  <p class="hidden">CORRECT ANSWER</p>
</article> */