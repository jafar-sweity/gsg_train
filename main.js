document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const quoteList = document.getElementById("quoteList");
    const errorMessage = document.getElementById("errorMessage");

    const apiUrl = "https://dummyjson.com/quotes";

    // Fetch quote data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        
            let quotes = data;
            if (Array.isArray(data)) {
                // If the data is already an array, use it as is
                quotes = data;
            } else if (Array.isArray(data.quotes)) {
                // If the array is nested inside an object, extract it
                quotes = data.quotes;
            } else {
                // Handle other cases or throw an error if the data structure is unexpected
                throw new Error("Invalid data structure");
            }
            // Display all quotes initially
            displayQuotes(quotes);

            // Add event listener to filter quotes on input change
            searchInput.addEventListener("input", function () {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredQuotes = quotes.filter(quote => quote.toLowerCase().includes(searchTerm));
                displayQuotes(filteredQuotes);
            });
        })
        .catch(error => {
            console.log("Error fetching quote data:", error);
            errorMessage.textContent = "Failed to fetch quote data. Please try again later.";
        });

    // Function to display quotes in the list
    function displayQuotes(quotes) {
        quoteList.innerHTML = "";
        quotes.forEach(quote => {
            const li = document.createElement("li");
            li.textContent = quote;
            quoteList.appendChild(li);
        });
    }
});