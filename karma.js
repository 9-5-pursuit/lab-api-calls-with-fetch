
fetch('https://opentdb.com/api.php?amount=10')

.then((apidata) =>{
   return apidata.json()
})

.then((actual_data) =>{

    //console.log(actual_data)
    const button =document.querySelector("form button")
    const main = document.querySelector("main")
    
    button.addEventListener("click",(event) => {

        event.preventDefault();

        for (let i=0; i<10;i++){
            const article = document.createElement("article")
            article.classList.add("card")
            main.append(article)

            let category = actual_data.results[i].category
            let question = actual_data.results[i].question
            let showAnswer = actual_data.results[i].correct_answer
            
            article.innerHTML = `<h2>${category}</h2> <p>${question}</p> <button>Show Answer</button> <p class="hidden">${showAnswer}</p>`
        }

        const buttons = document.querySelectorAll(".card button")
        const p = document.querySelectorAll(".hidden")

        for(let i=0;i<buttons.length;i++){

            buttons[i].addEventListener("click", (event) =>{
                event.preventDefault();
                p[i].style.display = "block"      
            })
        } 
    })
})


