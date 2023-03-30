// const center = document.querySelector("main.centered");

// function fetchAPI(url, callback){
//     fetch(url)
//     .then((response) =>{
//         return response.json();
//     })
//     .then((response)=>{
//         callback(response)
//     })
//     .catch((error)=>{
//         console.log(error)
//     });
// } 
// function fetchDate(){
//     fetchAPI("https://opentdb.com/api.php?amount=10") function (response){
//         const article = document.createElement("article");
//         article.setAttribute("class","car");

//         const h2 = document.createElement("h2");
//         h2.textContent= "CATEGORY"

//         const p = document.createElement("p");
//         p.textContent= "QUESTION"

//         const button = document.createElement("button");
//         button.textContent =
//     })
  


const api_Url="https://opentdb.com/api.php?amount=10";
const form = document.querySelector("form");
const main = document.querySelector("main")
 form.addEventListener("submit", (event)=>{
    event.preventDefault();
    fetch(api_Url)
    .then((response)=> response.json())
    .then((json)=>{
       main.innerHTML=" ";
        const results = json.results;
        results.forEach((result)=>{
            displayResult(result);
        });
    })
    .catch((error)=>{
        console.log(error)
    });
 });

 const displayResult = (result) =>{
    console.log(result)

    const card = document.createElement('article');
    card.classList.add("card");

    const category = document.createElement('h2');
    category.textContent= result.category;

    const p1 = document.createElement("p");
    const question = result.question;
    p1.innerHTML = question;

    const button = document.createElement("button")
    button.textContent = "Show Answer";

    const p2 = document.createElement("p")
    p2.classList.add("hidden");
    p2.textContent=result.correct_answer;
  
    button.addEventListener("click",()=>{
        p2.classList.toggle("hidden");
    });
    card.append(category, p1, button, p2) ;
    main.append(card);
 }