const BASE_URL = "https://opentdb.com/api.php?amount=10"; //

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
}); //may have to put this at the end!!

fetch(BASE_URL)
  .then((response) => response.json()) //parse data from url
  .then((output) => {
    //access main from the html
    const main = document.querySelector("main");

    let array = output.results;
    // console.log(array);
    array.forEach((element) => {
      //   console.log(element.category);

      //create an article element and append it to the main tag
      const article = document.createElement("article");
      article.classList.add("card");
      article.innerHTML = `<h2>${element.category}</h2><p>${element.question}</p><button class = 'answer'>Show Answer</button><p class='hidden'>${element.correct_answer}</p>`; //use innerHTML to make this easier
      main.append(article);
      const button = document.querySelector(".answer");
      const hiddenClass = document.querySelector(".hidden");
      button.addEventListener("click", (event) => {
        hiddenClass.style.display = "block"; //update the style
      });
    });

    //output
    // console.log(output); //evalutes to response.json
  })
  .catch((error) => {
    console.log(error);
  });

// console.log(main);

// function fetchData() {
//   fetch(BASE_URL)
//     .then((response) => {
//       console.log(response);
//       return response.json();
//     })
//     .then((response) => {
//       //   console.log(response);
//       respond.forEach((item) => {});
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// fetchData();

// fetch(BASE_URL)
//   .then((response) => response.json())
//   .then((response) => {
//     console.log(response);
//   });
