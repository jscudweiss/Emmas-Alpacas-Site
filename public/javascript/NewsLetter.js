const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const thank = urlParams.get('thank');

if (thank) {
    console.log(thank);
    $('#thank_message').text("Thank you for your submission!");
}