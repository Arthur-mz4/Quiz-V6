let timer;
let timeLeft = 30;
let isQuizActive = true;
let currentQuestionIndex = 0;
const totalQuestions = 3; // Update this with the total number of questions

// Example questions array with explanations
const questions = [
    {
        question: "What's a good way to improve credit score?",
        options: ["Ignoring bills", "Paying bills on time", "Maxing out credit cards", "Opening multiple accountse"],
        correct: "Paying bills on time",
        explanation: "Paying bills on time helps improve your credit score."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars",
        explanation: "Mars is known as the Red Planet because of its reddish appearance, which is due to iron oxide on its surface."
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: "Pacific Ocean",
        explanation: "The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 63 million square miles."
    }
];

window.onload = function() {
    loadQuestion();
    startTimer();

    document.querySelectorAll('.answer-btn').forEach(button => {
        button.addEventListener('click', handleAnswerClick);
    });

    document.getElementById('next-btn').addEventListener('click', loadNextQuestion);
};

function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timeLeft = 30; // Reset the timer to 30 seconds
    document.getElementById('timer').textContent = timeLeft;
    if (isQuizActive) {
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;

    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((button, index) => {
        button.textContent = question.options[index];
        button.setAttribute('data-correct', question.options[index] === question.correct);
        button.classList.remove('correct', 'incorrect'); // Remove any previous classes
        button.disabled = false;
    });

    document.getElementById('popup').textContent = '';
    document.getElementById('popup').classList.remove('correct', 'incorrect'); // Remove any previous class
    document.getElementById('next-btn').disabled = true;
}

function handleAnswerClick(event) {
    const button = event.target;
    const isCorrect = button.getAttribute('data-correct') === 'true';
    const correctAnswer = questions[currentQuestionIndex].correct;
    const explanation = questions[currentQuestionIndex].explanation;

    if (isCorrect) {
        button.classList.add('correct');
        document.getElementById('popup').textContent = ''; // Clear any previous popup message
        document.getElementById('popup').classList.remove('incorrect'); // Remove incorrect class if it was added
        document.getElementById('popup').classList.add('correct'); // Add correct class
    } else {
        button.classList.add('incorrect');
        document.getElementById('popup').textContent = `Incorrect! The correct answer is ${correctAnswer}. ${explanation}`;
        document.getElementById('popup').classList.remove('correct'); // Remove correct class if it was added
        document.getElementById('popup').classList.add('incorrect'); // Add incorrect class
        // Highlight the correct answer with a green background
        document.querySelectorAll('.answer-btn').forEach(btn => {
            if (btn.getAttribute('data-correct') === 'true') {
                btn.classList.add('correct-highlight');
            }
        });
    }

    document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
    document.getElementById('next-btn').disabled = false;
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        loadQuestion();
        updateProgressBar();
        startTimer(); // Restart the timer for the next question
    } else {
        endQuiz();
    }
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function endQuiz() {
    document.getElementById('popup').textContent = 'Time is up!';
    document.getElementById('popup').classList.add('incorrect'); // Ensure popup has incorrect class for time up
    document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('finish-btn').style.display = 'block';
    
}

