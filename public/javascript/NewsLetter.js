const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const thank = urlParams.get('thank');
$(document).ready(() => {
    if (thank) {
        console.log(thank);
        $('#news_form_submit').empty();
        $('#thank_message').text("Thank you for your submission!");
    }
})