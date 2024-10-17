// script.js

// Function to fetch weather data
async function fetchWeather(city) {
    const unit = document.getElementById('unitSelector').value; // my selected units (m for Celsius, u for Fahrenheit)
    try {
        const response = await fetch(`https://wttr.in/${city}?format=%C+%t+%h+%w&${unit}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.text(); // Get the response as text
        // Split the data and map it to the correct variables
        const parts = data.split(' '); 
        
        // For my responses
        const conditions = parts[0]; // First part is conditions
        const temperature = parts[1]; // Second part is temperature
        const humidity = parts[2]; // Third part is humidity
        const windSpeed = parts[3]; // Fourth part is wind speed

        // Display weather info
        document.getElementById('errorMessage').textContent = ''; // Clear error message
        document.getElementById('cityName').textContent = city;
        document.getElementById('temperature').textContent = `Temperature: ${temperature}`;
        document.getElementById('conditions').textContent = `Conditions: ${conditions}`;
        document.getElementById('humidity').textContent = `Humidity: ${humidity}`;
        document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed}`;
    } catch (error) {
        // Display error message if city is not found
        document.getElementById('errorMessage').textContent = 'Error: Please enter a valid city name.';
        clearWeatherInfo();
    }
}

// Function to clear weather information
function clearWeatherInfo() {
    document.getElementById('cityName').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('conditions').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('windSpeed').textContent = '';
}

// Function to refresh weather data and clear comments
function refreshApp() {
    clearWeatherInfo();
    document.getElementById('commentList').innerHTML = ''; // Clear comments
    document.getElementById('errorMessage').textContent = ''; // Clear error message
    document.getElementById('cityInput').value = ''; // Clear city input
}

// Function to add a comment
function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();

    if (commentText !== '') {
        const commentList = document.getElementById('commentList');

        // Create a comment element
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        // Add comment text
        const commentTextSpan = document.createElement('span');
        commentTextSpan.textContent = commentText;
        commentDiv.appendChild(commentTextSpan);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => commentList.removeChild(commentDiv);
        commentDiv.appendChild(deleteButton);

        // Add the comment to the list
        commentList.appendChild(commentDiv);

        // Clear the input field
        commentInput.value = '';
    }
}

// Event listeners
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        document.getElementById('errorMessage').textContent = 'Please enter a city name.';
    }
});
document.getElementById('refreshButton').addEventListener('click', refreshApp);
document.getElementById('addCommentButton').addEventListener('click', addComment);
