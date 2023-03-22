const BASE_URL = "https://opentdb.com/api.php?amount=10";

const form = document.querySelector('form');
const select = document.createElement('select');
select.setAttribute('name', 'category');
select.setAttribute('id', 'category');
select.style.margin = '5px'
let option1 = document.createElement('option');
select.setAttribute('value', "any")
option1.textContent = "--Any Category--";
select.appendChild(option1);

fetch("https://opentdb.com/api_category.php").then(response => response.json()).then(
    items => {
        items['trivia_categories'].forEach(item => {
            let option1 = document.createElement('option');
            option1.setAttribute('value', item['id'])
            option1.textContent = item['name'];
            select.appendChild(option1);
        })
    }
).catch(e => console.log(e))
// Insert the select element before the button element in the form
const button = form.querySelector('button');
form.insertBefore(select, button);

document.querySelector('form').addEventListener("submit", (event) => {
    event.preventDefault()

    const category = form.elements.category.value;
    let addon;
    if (category == '--Any Category--') addon = ''
    else addon = "&category=" + category

    fetch(`${BASE_URL}${addon}`).then((response) => response.json())
        .then(displayCard => {
            const mainElement = document.querySelector('.centered');
            const articleElements = mainElement.querySelectorAll('article');
            for (let i = 0; i < articleElements.length; i++) {
                mainElement.removeChild(articleElements[i]);
            }
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
        ).catch(displayError => console.log(displayError));
})
