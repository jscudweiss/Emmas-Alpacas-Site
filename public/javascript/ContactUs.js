const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const errorMessage = urlParams.get('error_message');
const prev_name = urlParams.get('name');
const prev_email = urlParams.get('email');
const prev_phone_number = urlParams.get('phone_number');
const prev_message = urlParams.get('message')

if (errorMessage) {
    $('#name').val(prev_name);
    $('#email').val(prev_email);
    $('#phone_number').val(prev_phone_number);
    $('#message').text(prev_message);
    $('#error_message').text(errorMessage);
}

// const thank = urlParams.get('thank');
// $(document).ready(() => {
//     if (thank) {
//         console.log(thank);
//         $('#news_form_submit').empty()
//         $('#thank_message').text("Thank you for your submission!")
//     }
// })