const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  fetch('https://opentdb.com/api.php?amount=10')
    .then((response) => response.json())
    .then((data) => {
      const main = document.querySelector('main');
      const questions = data.results;

      // Check if there are already cards on the page
      const existingCards = document.querySelectorAll('.card');
      if (existingCards.length > 0) {
        existingCards.forEach(card => card.remove());
      }

      questions.forEach((question) => {
        const card = document.createElement('article');
        card.classList.add('card');

        if (question.difficulty === 'easy') {
          card.classList.add('easy');
        } else if (question.difficulty === 'medium') {
          card.classList.add('medium');
        } else if (question.difficulty === 'hard') {
          card.classList.add('hard');
        }

        const category = document.createElement('h2');

        category.textContent = question.category;
        card.appendChild(category);

        const questionText = document.createElement('p');

        questionText.textContent = question.question;
        card.appendChild(questionText);

        const showAnswerButton = document.createElement('button');

        showAnswerButton.textContent = 'Show Answer';
        card.appendChild(showAnswerButton);

        const correctAnswer = document.createElement('p');
        
        correctAnswer.classList.add('hidden');
        correctAnswer.textContent = question.correct_answer;
        card.appendChild(correctAnswer);

        main.appendChild(card);

        showAnswerButton.addEventListener('click', () => {
          correctAnswer.classList.toggle('hidden');
        });
      });
    })
    .catch((error) => {
      console.error('Error retrieving trivia questions:', error);
    });
});