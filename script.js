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
//make dropdown from the categories api
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

//add a checkbox div for multiple choice game
let cdiv = document.createElement('div');
let chbx = document.createElement('input');
let label = document.createElement('label');
label.appendChild(document.createTextNode('Multiple choice toggle'));
chbx.setAttribute('type', 'checkbox')
chbx.setAttribute('value', 'gamechoice')
chbx.setAttribute('id', 'myCheckbox')
cdiv.appendChild(chbx)
cdiv.appendChild(label)
form.appendChild(cdiv)

document.querySelector('form').addEventListener("submit", (event) => {
    event.preventDefault()

    const category = form.elements.category.value;
    let addon;
    if (category == '--Any Category--') addon = ''
    else addon = "&category=" + category;
    //Multiple choice button value
    let addon2;
    if (form.elements.myCheckbox.checked) {
        addon2 = 'SHOW MULTIPLE CHOICES';
    }
    fetch(`${BASE_URL}${addon}${addon2 ? '&type=multiple' : ''}`).then((response) => response.json())
        .then(displayCard => {
            //clear grid for new trivia cards
            const mainElement = document.querySelector('.centered');
            const articleElements = mainElement.querySelectorAll('article');
            for (let e of articleElements) {
                mainElement.removeChild(e);
            }
            displayCard['results'].forEach(item => {
                //method to add list of multichoice with
                //highlighted correct answer
                const multichoice = () => {
                    if (addon2) {
                        let arr = item['incorrect_answers']
                        arr.push(item['correct_answer'])
                        let newul = document.createElement('ul')
                        arr.forEach(e => {
                            let newli = document.createElement('li')
                            newli.textContent = e
                            newul.appendChild(newli)
                        })
                        //hover effect on the correct answer in the multi
                        //choice list
                        let lastli = newul.lastChild;
                        lastli.addEventListener('mouseenter', function () {
                            lastli.style.backgroundColor = 'yellow';
                        });
                        lastli.addEventListener('mouseleave', function () {
                            lastli.style.backgroundColor = '';
                        });
                        // shuffle the list items
                        for (let i = newul.children.length; i >= 0; i--) {
                            newul.appendChild(newul.children[Math.random() * i | 0]);
                        }
                        return newul;
                    } else {
                        const answerEl = articleElement.querySelector('.hidden');
                        answerEl.style.display = 'block';
                    }
                }
                const articleElement = document.createElement('article');
                articleElement.setAttribute('class', 'card');
                articleElement.innerHTML = `
                <h2>${item.category}</h2>
                <p>${item.question}</p>
                <button>${addon2 ?? 'Show Answer'}</button>
                <p class="hidden">${item.correct_answer}</p>
                <div class="unList"></div>
                `;
                //make multichoice list hidden
                if (addon2) {
                let hiddenUl = articleElement.querySelector('.unList')
                hiddenUl.style.display = 'none'
                hiddenUl.appendChild(multichoice())
                }
                // Add an event listener to the button in each article
                const button = articleElement.querySelector('button');
                button.addEventListener('click', () => {
                    if (addon2) {
                        let hiddenUl2 = articleElement.querySelector('.unList')
                        hiddenUl2.style.display = 'block'
                    }
                    multichoice();
                });
                if (item.difficulty == 'hard') {
                    articleElement.style.borderColor = 'red'
                }
                mainElement.appendChild(articleElement);
            });
        }
        ).catch(displayError => console.log(displayError));
})