const BASE_URL = "https://opentdb.com/api.php?amount=10";

document.querySelector('form').addEventListener("submit", (event) => {
    event.preventDefault()

    fetch(BASE_URL).then((response) => response.json())
        .then(displayCard => {

            const mainElement = document.querySelector('.centered');
            displayCard['results'].forEach(item => {
                const articleElement = document.createElement('article');
                articleElement.setAttribute('class', 'card');

                articleElement.innerHTML = `
                <h2>${item.category}</h2>
                <p>${item.question}</p>
                <button>Show Answer</button>
                <p class="hidden">${item.correct_answer}</p>
                `;
                // Add an event listener to the button in each article
                const button = articleElement.querySelector('button');
                const answerEl = articleElement.querySelector('.hidden');
                button.addEventListener('click', () => {
                    answerEl.style.display = 'block';
                });
                if (item.difficulty == 'hard') {
                    articleElement.style.borderColor = 'red'
                }
                mainElement.appendChild(articleElement);
            });
        }
        )
        .catch(displayError => console.log('no'));
})
