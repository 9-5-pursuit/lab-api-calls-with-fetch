const formOne = document.querySelector("form button").addEventListener("submit", (event) => {
    event.preventDefault();
});

fetch("https://opentdb.com/api.php?amount=10")

  .then((response) => {
    
    return response.json();
})
 
  .then((output) => {
    console.log(output.results);

  const main = document.querySelector("main");
    let array = output.results;

    array.forEach((element) => {

    const article = document.createElement("article");
     article.classList.add("card");
      article.innerHTML = `<h2>${element.category}</h2><p>${element.question}</p><button class='answer'>Show Answer</button><p class='hideen'>${element.correct_answer}</p>`;
      main.append(article);

      const button = document.querySelector(".answer");

      const hiddenClass = document.querySelector(".hidden");


      button.addEventListener("click", (event) => {
        
        hiddenClass.style.display = "block";
      })


    })

})
.catch((error) => {
    console.log(error);
});