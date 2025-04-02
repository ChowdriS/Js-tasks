let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionNumber = 1;

const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const nextBtn = document.querySelector('.next-btn');
const scoreContainer = document.querySelector('.score-container');
const questionCounter = document.querySelector('.question-count');
const scoreEl = document.querySelector('#score');

function initializeQuiz() {
    selectedQuestions = mathQuestions.sort(() => Math.random() - 0.5).slice(0, 5);
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = '';
    questionCounter.textContent = `${questionNumber}/5`

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsEl.appendChild(button);
    });

    nextBtn.classList.add('hidden');
}

function checkAnswer(selectedIndex) {
    const question = selectedQuestions[currentQuestionIndex];
    const buttons = optionsEl.querySelectorAll('button');

    buttons.forEach(button => button.disabled = true);

    if (selectedIndex === question.correct) {
        score++;
        buttons[selectedIndex].classList.add('correct');
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
    }
    questionNumber++;
    nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        questionCounter.classList.add('hidden');
        showScore();
    }
});

function showScore() {
    questionEl.classList.add('hidden');
    optionsEl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreEl.textContent = score;
}

document.addEventListener("DOMContentLoaded", initializeQuiz());