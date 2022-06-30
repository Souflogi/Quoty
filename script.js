const quoteContainer = document.getElementById("quote-container");
const quoteUI = document.querySelector("#quote");
const authorUI = document.querySelector("#author");
const btnTwiiter = document.querySelector("#twiiter");
const btnNewQuote = document.querySelector("#new-quote");
const loaderUI = document.querySelector(".loader");

let apiQuotes = [];

//show Loading
function loading() {
  quoteContainer.hidden = true;
  loaderUI.hidden = false;
}
//Hide loading
function complete() {
  quoteContainer.hidden = false;
  loaderUI.hidden = true;
}

//show new Quote

const newQuote = () => {
  loading();
  // pick a random quote from apiQuotes array
  const randomQuoteIndex = Math.floor(Math.random() * apiQuotes.length);
  const { text: quote, author } = apiQuotes[randomQuoteIndex];

  quoteUI.textContent = quote;
  authorUI.textContent = author ? `--${author}` : "Unknown";

  quote.length > 70
    ? quoteUI.classList.add("long-quate")
    : quoteUI.classList.remove("long-quate");

  complete();
};

async function getGuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    // Catch the error
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteUI.textContent} - ${authorUI.textContent}`;
  window.open(twitterUrl, "_blank");
}
//on Load
getGuotes();

//Add eventListeners

btnNewQuote.addEventListener("click", getGuotes);
btnTwiiter.addEventListener("click", tweetQuote);
