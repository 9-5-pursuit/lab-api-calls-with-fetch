const center = document.querySelector(".centered")



    fetch("https://opentdb.com/api.php?amount=10")
    .then((response) => response.json())
    .then((response) => {

        structure(response)

    })
    .catch((error) => {
      console.log(error);
    });




    function structure(data){
        const array = data.results
        array.forEach((item)=>{
            const h2 = document.querySelector("main article h2")
            h2.textContent = item.category
    
            const section = document.querySelector("main article")
            section.prepend(h2)
    
            const p = document.querySelector(" main article p")
            p.textContent = item.question
            h2.after(p)
    
            const button = document.querySelector("main article button")
            button.textContent = "Show Answer"
            p.after(button)

            const pCorrect = document.querySelector(".hidden")
                pCorrect.textContent = item.correct_answer
    
           

            button.addEventListener("click", () => { 
                pCorrect.style.display = "inline";
              });
    
    
          })

    }



// <article class="card">
//   <h2>CATEGORY</h2>
//   <p>QUESTION</p>
//   <button>Show Answer</button>
//   <p class="hidden">CORRECT ANSWER</p>
// </article>


  