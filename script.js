// script.js

// Sample book data (replace with your actual data)
const bookData = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", year: 1925 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", year: 1960 },
    { title: "1984", author: "George Orwell", genre: "Dystopian", year: 1949 },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", year: 1951 },
    { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", year: 1813 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", year: 1937 },
    { title: "The Hunger Games", author: "Suzanne Collins", genre: "Dystopian", year: 2008 },
    { title: "The Da Vinci Code", author: "Dan Brown", genre: "Mystery", year: 2003 },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", year: 1954 },
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", year: 1997 }
];

const bookList = document.getElementById("book-list-ul");
const loadMoreButton = document.getElementById("load-more-button");
const searchInput = document.getElementById("search-bar");
const searchSuggestions = document.getElementById("search-suggestions");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const checkoutButton = document.getElementById("checkout-button");

let cartItems = 0;
const selectedBooks = [];

// Function to display books
function displayBooks(books) {
    bookList.innerHTML = "";
    books.forEach(book => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Genre: ${book.genre}</p>
            <p>Year: ${book.year}</p>
            <button class="add-to-cart-button">Add to Cart</button>
        `;

        const addToCartButton = listItem.querySelector(".add-to-cart-button");
        addToCartButton.addEventListener("click", () => {
            cartItems++;
            selectedBooks.push(book);
            updateCartDisplay();
        });

        bookList.appendChild(listItem);
    });
}

// Function to update cart display
function updateCartDisplay() {
    cartCount.textContent = `Cart: ${cartItems} items`;
    cartList.innerHTML = "";

    selectedBooks.forEach(book => {
        const cartItem = document.createElement("li");
        cartItem.textContent = `${book.title} by ${book.author}`;
        cartList.appendChild(cartItem);
    });
}

// Function to filter books based on search term
function filterBooks(searchTerm) {
    return bookData.filter(book => {
        return (
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.genre.toLowerCase().includes(searchTerm) ||
            book.year.toString().includes(searchTerm)
        );
    });
}

// Function to display search suggestions
function displaySearchSuggestions(books) {
    searchSuggestions.innerHTML = "";

    if (books.length === 0) {
        searchSuggestions.style.display = "none";
        return;
    }

    books.slice(0, 5).forEach(book => {
        const suggestionItem = document.createElement("li");
        suggestionItem.textContent = `${book.title} by ${book.author}`;
        suggestionItem.addEventListener("click", () => {
            searchInput.value = `${book.title} by ${book.author}`;
            searchSuggestions.style.display = "none";
        });
        searchSuggestions.appendChild(suggestionItem);
    });

    searchSuggestions.style.display = "block";
}

// Event listeners

loadMoreButton.addEventListener("click", () => {
    // You can implement pagination or lazy loading here
    // For simplicity, let's display all books for now
    displayBooks(bookData);
});

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const matchingBooks = filterBooks(searchTerm);
    displaySearchSuggestions(matchingBooks);
});

checkoutButton.addEventListener("click", () => {
    if (selectedBooks.length === 0) {
        alert("Your cart is empty. Please add books before checking out.");
    } else {
        alert("Checkout successful! Thank you for your purchase.");
        // Clear the cart and update the display
        cartItems = 0;
        selectedBooks.length = 0;
        updateCartDisplay();
    }
});

// Initial book display
displayBooks(bookData);

// Initialize the sorting option
let currentSortOption = 'title';

// Function to sort and display books based on the selected option
function sortAndDisplayBooks(option) {
    currentSortOption = option;

    // Sort bookData based on the selected option
    bookData.sort((a, b) => {
        if (option === 'title') {
            return a.title.localeCompare(b.title);
        } else if (option === 'author') {
            return a.author.localeCompare(b.author);
        } else if (option === 'genre') {
            return a.genre.localeCompare(b.genre);
        } else if (option === 'year') {
            return a.year - b.year;
        }
    });

    // Display the sorted books
    displayBooks(bookData);
}

// Get the sort button and sorting options within the book-list section
const bookListSection = document.getElementById('book-list');
const sortButton = bookListSection.querySelector('#sort-button');
const sortOptions = bookListSection.querySelector('#sort-options');

// Add event listener to the sort button to show sorting options
sortButton.addEventListener('click', () => {
    sortOptions.style.display = (sortOptions.style.display === 'block') ? 'none' : 'block';
});

// Add event listeners to sorting option buttons
const sortOptionButtons = sortOptions.querySelectorAll('.sort-option');
sortOptionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedOption = button.getAttribute('data-sort');
        sortAndDisplayBooks(selectedOption);
        sortOptions.style.display = 'none'; // Hide sorting options after selection
    });
});

// Initial sorting by title
sortAndDisplayBooks(currentSortOption);
