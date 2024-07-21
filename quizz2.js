document.addEventListener('DOMContentLoaded', () => {
    const topic1Questions = [
        { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Lisbon"], correctIndex: 2 },
        { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correctIndex: 1 },
        { question: "What is the largest ocean on Earth?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correctIndex: 3 },
        { question: "Which element has the chemical symbol O?", answers: ["Gold", "Oxygen", "Silver", "Iron"], correctIndex: 1 }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionText = document.getElementById('question-text');
    const answerButtons = document.querySelectorAll('.answer-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressCircle = document.querySelector('.progress-circle');
    const nextButton = document.getElementById('next-btn');

    function loadQuestion() {
        const question = topic1Questions[currentQuestion];
        questionText.textContent = question.question;

        answerButtons.forEach((button, index) => {
            button.textContent = question.answers[index];
            button.dataset.correctIndex = question.correctIndex;
            button.style.backgroundColor = ''; // Reset button color
            button.disabled = false; // Re-enable button
            button.addEventListener('click', () => checkAnswer(button));
        });

        nextButton.disabled = true; // Disable next button initially
        nextButton.textContent = (currentQuestion === topic1Questions.length - 1) ? 'Finish' : 'Next'; // Update button text
        updateProgress();
    }

    function checkAnswer(button) {
        const correctIndex = button.dataset.correctIndex;
        const selectedAnswer = button.textContent;

        if (selectedAnswer === topic1Questions[currentQuestion].answers[correctIndex]) {
            button.style.backgroundColor = 'green'; // Correct answer
            score++;
        } else {
            button.style.backgroundColor = 'red'; // Incorrect answer
            answerButtons[correctIndex].style.backgroundColor = 'green'; // Highlight correct answer

            // Display pop-up with correct answer
            const popup = document.createElement('div');
            popup.classList.add('popup');
            popup.textContent = `Wrong answer! The correct answer is: ${topic1Questions[currentQuestion].answers[correctIndex]}`;
            document.body.appendChild(popup);

            // Remove popup after a few seconds
            setTimeout(() => {
                popup.remove();
            }, 5000);
        }

        // Disable all answer buttons after selection
        answerButtons.forEach(btn => {
            btn.disabled = true;
        });

        // Enable next button
        nextButton.disabled = false;
    }

    function nextQuestion() {
        if (currentQuestion < topic1Questions.length - 1) {
            currentQuestion++;
            resetButtons();
            loadQuestion();
        } else {
            // Quiz completed, navigate to the completion page
            window.location.href = `completion.html?score=${score}`;
        }
    }

    function resetButtons() {
        answerButtons.forEach(btn => {
            btn.style.backgroundColor = ''; // Reset button color
            btn.disabled = false; // Re-enable button
        });
    }

    function updateProgress() {
        const progress = (currentQuestion / topic1Questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressCircle.textContent = `${Math.round(progress)}%`;
    }

    // Event listener for next button
    nextButton.addEventListener('click', nextQuestion);

    // Start with an empty progress bar
    updateProgress();

    // Load the first question on page load
    loadQuestion();
});