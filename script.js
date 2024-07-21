document.addEventListener('DOMContentLoaded', () => {
    // Array of image URLs for the slideshow
    const images = [
        'natur.jpeg', // Replace with your actual image paths
        'natuur.jpeg',
        'natu.jpeg'
    ];
    const header = document.querySelector('header');
    let currentImage = 0;

    // Function to change the background image of the header
    function changeBackground() {
        header.style.backgroundImage = `url('${images[currentImage]}')`;
        currentImage = (currentImage + 1) % images.length;
    }

    // Initialize the background image change
    changeBackground();
    setInterval(changeBackground, 5000); // Change image every 5 seconds

    // Get the popup element
    const popup = document.getElementById('popup');

    // Add event listener for the "Rules" button
    document.getElementById('rules-btn').addEventListener('click', () => {
        popup.classList.add('visible'); // Show the popup
        setTimeout(() => {
            popup.classList.remove('visible'); // Hide the popup after 7 seconds
        }, 7000); // 7000 milliseconds = 7 seconds
    });

    // Add event listener for the "Hint" button
    document.getElementById('hint-btn').addEventListener('click', () => {
        alert('Hints: \nHints will show you only 35% of the work needed to answer the question. You will need to complete the rest on your own.');
    });
});
