let dropdown = ce({ tagname: "select", id: "dropdown" }); // create a dropdown element `ce` is a function that creates an element
dropdown.append(
  ...[
    { tagname: "option", value: "", innerText: "Random" },
    { tagname: "option", value: "easy", innerText: "Easy" },
    { tagname: "option", value: "medium", innerText: "Medium" },
    { tagname: "option", value: "hard", innerText: "Hard" },
  ].map((el) => ce(el))
);

document.querySelector("form").prepend(dropdown); // prepend the dropdown to the form. prepend is a method that adds an element to the beginning of a parent element
document.querySelector("form").addEventListener("submit", (evt) => {
  evt.preventDefault();
  getResponse(document.querySelector("main"), evt.target.dropdown.value);
  document.querySelector("main").innerHTML = "";
});

async function getResponse(main, level = "medium") {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&difficulty=${level}`
    );
    let rst = await response.json();
    rst.results.forEach((el) => main.append(create_card(el)));
  } catch (error) {
    error_handling(error);
  }
} // getResponse is an async function that fetches data from the api and creates a card for each question. aync functions return a promise and can be awaited.

function create_card(el) {
  let answer = ce({ style: "margin:15px 3px;" });
  let id = el.question.replace(/\W/g, "");
  let correct_answer;
  switch (el.type) {
    case "boolean":
      let true_ = ce({ tagname: "label", innerText: "True" });
      true_.append(
        ce({ tagname: "input", type: "radio", name: id, value: true })
      );
      let false_ = ce({ tagname: "label", innerText: "False" });
      false_.append(
        ce({ tagname: "input", type: "radio", name: id, value: false })
      ); // create a label element for true and false and append an input element to each label. append the labels to the answer element. append is used to add an element to the end of a parent element. In this case the parent element is the answer element

      correct_answer = el.correct_answer ? true_ : false_;
      answer.append(true_, false_);
      break;
    case "multiple":
      let acc = [];
      for (let x in el.incorrect_answers) {
        acc.push(
          ce({
            tagname: "label",
            style: "display:Block;margin:15px 3px;",
            innerHTML: el.incorrect_answers[x],
          })
        );
      }
      correct_answer = ce({
        tagname: "label",
        style: "display:Block;margin:15px 3px;",
        innerHTML: el.correct_answer,
      });
      acc.push(correct_answer); // create a label element for each incorrect answer and the correct answer. append the labels to the answer element

      for (let x of acc)
        x.prepend(ce({ tagname: "input", type: "radio", name: id }));
      answer.append(...shuffle(acc));
      break;
    default:
      error_handling("unknown question type");
  } // switch statement that creates a label element for each answer and appends an input element to each label. append is used to add an element to the end of a parent element. In this case the parent element is the answer element

  let article = ce({ tagname: "article", class: `card ${el.difficulty}` });
  article.append(
    ce({ tagname: "h2", innerText: el.category }),
    ce({ tagname: "p", innerHTML: el.question }),
    answer,
    ce({
      tagname: "button",
      innerHTML: "Show Answer",
      event_: { click: show_correct_answer.bind(correct_answer) },
    }),
    ce({ tagname: "p", class: "hidden", innerText: el.correct_answer })
  );
  return article;
} // create_card is a function that creates a card element for each question. the card element is appended to the main element

function ce(obj) {
  let rst = document.createElement(obj.tagname || "div");
  for (let x in obj)
    switch (x) {
      case "tagname":
        break;
      case "innerHTML":
      case "innerText":
        rst[x] = obj[x];
        break;
      case "event_":
        for (let y in obj[x]) rst.addEventListener(y, obj[x][y], false);
        break;
      default:
        rst.setAttribute(x, obj[x]);
    }
  return rst;
} // the ce function creates an element. the obj argument is an object that contains the attributes of the element. the obj argument can also contain an event_ attribute that contains an object with event listeners. the event_ attribute is used to add event listeners to the element

function show_correct_answer(evt) {
  setTimeout(() => this.classList.remove("correct"), 2000);
  this.classList.add("correct");
} // show_correct_answer is a function that adds a class to the correct answer

function error_handling(text) {
  document.querySelector("main").innerHTML = `<p class='error'>${text}</p>`;
} // error_handling is a function that displays an error message

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
} // shuffle is a function that shuffles an array thank you stack overflow.
