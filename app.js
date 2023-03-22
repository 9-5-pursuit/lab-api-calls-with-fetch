// https://opentdb.com/api.php?amount=10


fetch("https://opentdb.com/api.php?amount=10").then(res => {
    return res.json()
})
 .then(triviaQuestions => {
  triviaQuestions.forEach(element => {
    console.log(element)
  });
 })
 .catch(error => {
    console.log("error")
 } )


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

