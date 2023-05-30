document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const quoteList = document.getElementById("quoteList");
    const errorMessage = document.getElementById("errorMessage");

    const apiUrl = "https://dummyjson.com/quotes";

   
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        
            let quotes = data;
            if (Array.isArray(data)) {
             
                quotes = data;
            } else if (Array.isArray(data.quotes)) {
                
                quotes = data.quotes;
            } else {
                
                throw new Error("Invalid data structure");
            }
           
            displayQuotes(quotes);

          
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

    function displayQuotes(quotes) {
        quoteList.innerHTML = "";
        quotes.forEach(quote => {
            const li = document.createElement("li");
            li.textContent = quote;
            quoteList.appendChild(li);
        });
    }
});