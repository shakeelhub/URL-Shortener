// This function is used to select a DOM element based on the provided CSS selector
const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Cannot find the element ${selector}`);
};

const form = selectElement("form");
const input = selectElement("input");
const result = selectElement(".result");
const hamburger = selectElement(".hamburger");
const navMenu = selectElement(".nav-menu");

// Event listener for hamburger icon
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

//Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = input.value;

    shortenUrl(url);
});

//Using Promise to Handle the Asynchronous Operation
//This function takes a URL as input and uses the Fetch API to send a request to the "https://api.shrtco.de/v2/shorten" endpoint with the URL as a query parameter. It then handles the asynchronous response using promises.
function shortenUrl(url) {
    fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const newUrl = document.createElement("div");
            newUrl.classList.add("item");
            newUrl.innerHTML = `
                <p>${data.result.short_link}</p>
                <button class="newUrl-btn">Copy</button>
            `;
            result.prepend(newUrl);
            const copyBtn = result.querySelector(".newUrl-btn");
            const linkText = newUrl.querySelector('p');
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(linkText.textContent);
                copyBtn.textContent = 'URL Copied';
                setTimeout(() => {
                  copyBtn.textContent = 'Copy';
                }, 5000); // Reset the text to "Copy" after 5 seconds
              });
            input.value = "";
        })
        .catch(err => {
            console.log(err);
        });
}
